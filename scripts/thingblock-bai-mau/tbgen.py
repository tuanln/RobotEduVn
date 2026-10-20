"""Sinh tệp ThingBlock .tb (zip chứa project.json kiểu sb3 + trường `board`).

Mẫu Stage/Sprite lấy từ một dự án lưu thật bằng app (bsilk). Dropdown của khối là FIELD,
ô số/chữ là INPUT có shadow. Chạy samples.py để sinh 15 bài.
"""
import json, os, random, string, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, 'template')

ALPHA = string.ascii_letters + string.digits + '!#%()*+,-./:;=?@[]^_`{|}~'


# ---- DSL ---------------------------------------------------------------------
def num(v): return ('lit', 4, str(v))
def pos(v): return ('lit', 5, str(v))
def whole(v): return ('lit', 6, str(v))
def txt(s): return ('lit', 10, str(s))
def color(hexs): return ('lit', 9, hexs)
def var(n): return ('var', n)
def B(op, inputs=None, fields=None, **kw):
    return {'op': op, 'in': inputs or {}, 'f': fields or {}, **kw}

# lõi
def setv(n, value): return B('data_setvariableto', {'VALUE': value}, {'VARIABLE': n})
def chg(n, value): return B('data_changevariableby', {'VALUE': value}, {'VARIABLE': n})
def eq(a, b): return B('operator_equals', {'OPERAND1': a, 'OPERAND2': b})
def lt(a, b): return B('operator_lt', {'OPERAND1': a, 'OPERAND2': b})
def gt(a, b): return B('operator_gt', {'OPERAND1': a, 'OPERAND2': b})
def AND(a, b): return B('operator_and', {'OPERAND1': a, 'OPERAND2': b})
def sub(a, b): return B('operator_subtract', {'NUM1': a, 'NUM2': b})
def IF(c, *body): return B('control_if', {'CONDITION': c}, sub_={'SUBSTACK': list(body)})
def IFELSE(c, then, other): return B('control_if_else', {'CONDITION': c}, sub_={'SUBSTACK': then, 'SUBSTACK2': other})
def FOREVER(*body): return B('control_forever', sub_={'SUBSTACK': list(body)})
def REPEAT(n, *body): return B('control_repeat', {'TIMES': whole(n)}, sub_={'SUBSTACK': list(body)})
def wait(s): return B('control_wait', {'DURATION': pos(s)})
def call(p): return B('procedures_call', proc=p)
def printv(v): return B('control_print', {'STRING': v})

# hat
FLAG = lambda: B('event_whenflagclicked')
SPACE = lambda: B('event_whenkeypressed', fields={'KEY_OPTION': 'space'})
BEGIN = lambda: B('event_whenarduinobegin')
LOOP = lambda: B('event_whenarduinoloop')

# Live (thingbotTelemetrix)
def l_motor(m, s): return B('thingbotTelemetrix_controlDC', {'SPEED': num(s)}, {'MOTOR_ID': str(m)})
def l_led(n, on): return B('thingbotTelemetrix_controlLED', fields={'LED_ID': str(n), 'LED_STATE': 'on' if on else 'off'})
def l_buzzer(v): return B('thingbotTelemetrix_controlBuzzer', {'FREQ': num(v)})
def l_dht(pin): return B('thingbotTelemetrix_setupDHT', {'PIN': num(pin)}, {'DHT_TYPE': 'DHT11'})
def l_temp(pin): return B('thingbotTelemetrix_readTemperature', {'PIN': num(pin)})

# ThingBot (nạp)
def motor(m, d, s): return B('thingBotC3_setMotor', {'SPEED': num(s)}, {'MOTOR': str(m), 'DIRECTION': d})
def led(n, v): return B('thingBotC3_setLed', {'BRIGHTNESS': num(v)}, {'LED': f'LED_{n}'})
def note(n, o, beats): return B('thingBotC3_playNote', {'BEATS': num(beats)}, {'NOTE': n, 'OCTAVE': str(o)})
switch = lambda: B('thingBotC3_switch')
def sport(n, pulse): return B('thingBotC3_setServo', {'PULSE': num(pulse)}, {'SERVO': str(n)})
# ngoại vi
def dht_init(pin): return B('dht_init', {'NO': num(1)}, {'PIN': str(pin), 'MODEL': '11'})
dht_temp = lambda: B('dht_readTemperature', {'NO': num(1)}, {'UNIT': 'false'})
dht_hum = lambda: B('dht_readHumidity', {'NO': num(1)})
def sonar(trig, echo): return B('ultrasonic_readDistance', fields={'TRIG': str(trig), 'ECHO': str(echo), 'UNIT': 'CM'})
def ser_begin(b): return B('serial_begin', fields={'BAUD': str(b)})
def ser_print(v): return B('serial_print', {'VALUE': v})
def ser_println(v): return B('serial_println', {'VALUE': v})
oled_init = lambda: B('oled_init', {'W': whole(128), 'H': whole(64)}, {'ADDR': '0x3c', 'CHIP': 'SSD1306'})
def oled_text(size): return B('oled_setText', fields={'SIZE': str(size), 'COLOUR': 'SSD1306_WHITE', 'BGCOLOR': 'SSD1306_BLACK'})
def oled_cur(x, y): return B('oled_setCursor', {'X': num(x), 'Y': num(y)})
def oled_print(v): return B('oled_print', {'DATA': v}, {'EOL': 'noWarp'})
oled_clear = lambda: B('oled_clear')
oled_refresh = lambda: B('oled_refresh')
def strip_init(n, pin): return B('rgbLedStrip_init', {'LEN': whole(n)}, {'PIN': str(pin)})
def strip_px(i, c): return B('rgbLedStrip_setPixelColor', {'NO': whole(i), 'COLOR': color(c)})
strip_clear = lambda: B('rgbLedStrip_clear')
strip_show = lambda: B('rgbLedStrip_show')
ps2_init = lambda: B('thingBotC3_initPS2')
ps2_read = lambda: B('ps2_readData')
def ps2_btn(b): return B('ps2_getButton', fields={'BUTTON': b})

NUMERIC_INPUTS = {'PULSE', 'NUM1', 'NUM2', 'NUM', 'SPEED', 'BRIGHTNESS', 'BEATS', 'X', 'Y', 'PIN', 'FREQ'}


# ---- ghi sb3 -----------------------------------------------------------------
class Project:
    def __init__(self, seed):
        self.rng = random.Random(seed)
        self.blocks = {}
        self.vars = {}  # tên -> (id, kiểu)

    def uid(self):
        return ''.join(self.rng.choice(ALPHA) for _ in range(20))

    def variable(self, name, kind='int'):
        if name not in self.vars:
            self.vars[name] = (self.uid(), kind)
        return self.vars[name][0]

    def value(self, node, parent, inp):
        numeric = inp in NUMERIC_INPUTS
        shadow = [4, ''] if numeric else [10, '']
        if isinstance(node, tuple):
            if node[0] == 'lit':
                t = 10 if inp.startswith('OPERAND') or inp == 'VALUE_TEXT' else node[1]
                return [1, [t, node[2]]]
            return [3, [12, node[1], self.variable(node[1])], shadow]
        bid = self.block(node, parent)
        if inp in ('CONDITION', 'OPERAND1', 'OPERAND2') and node['op'] in BOOLEAN_OPS:
            return [2, bid]
        return [3, bid, shadow]

    def block(self, node, parent):
        bid = self.uid()
        b = {'opcode': node['op'], 'next': None, 'parent': parent, 'inputs': {}, 'fields': {},
             'shadow': False, 'topLevel': False}
        self.blocks[bid] = b
        for k, v in node['in'].items():
            kind = 'VALUE_TEXT' if node['op'] == 'data_setvariableto' else k
            b['inputs'][k] = self.value(v, bid, kind)
        for k, v in node['f'].items():
            b['fields'][k] = [v, self.variable(v)] if k == 'VARIABLE' else [v, None]
        for k, stack in node.get('sub_', {}).items():
            if stack:
                b['inputs'][k] = [2, self.stack(stack, bid)]
        if 'proc' in node:
            b['mutation'] = {'tagName': 'mutation', 'children': [], 'proccode': node['proc'],
                             'argumentids': '[]', 'warp': 'false'}
        return bid

    def stack(self, nodes, parent):
        first, prev = None, parent
        for n in nodes:
            bid = self.block(n, prev)
            if first is None:
                first = bid
            else:
                self.blocks[prev]['next'] = bid
            prev = bid
        return first

    def script(self, nodes, x, y):
        bid = self.stack(nodes, None)
        b = self.blocks[bid]
        b.update(topLevel=True, parent=None, x=x, y=y)

    def define(self, name, body, x, y):
        did, pid = self.uid(), self.uid()
        self.blocks[did] = {'opcode': 'procedures_definition', 'next': None, 'parent': None,
                            'inputs': {'custom_block': [1, pid]}, 'fields': {}, 'shadow': False,
                            'topLevel': True, 'x': x, 'y': y}
        self.blocks[pid] = {'opcode': 'procedures_prototype', 'next': None, 'parent': did, 'inputs': {},
                            'fields': {}, 'shadow': True, 'topLevel': False,
                            'mutation': {'tagName': 'mutation', 'children': [], 'proccode': name,
                                         'argumentids': '[]', 'argumentnames': '[]',
                                         'argumentdefaults': '[]', 'warp': 'false'}}
        self.blocks[did]['next'] = self.stack(body, did)

    def save(self, path, board=None, extensions=(), float_vars=()):
        for n in float_vars:
            self.variable(n, 'float')
        proj = json.load(open(os.path.join(TEMPLATE, 'project.json')))
        stage, sprite = proj['targets']
        stage['variables'] = {vid: [n, 0] for n, (vid, _) in self.vars.items()}
        stage['variableTypes'] = {vid: ('float' if n in float_vars else kind) for n, (vid, kind) in self.vars.items()}
        sprite['blocks'] = self.blocks
        sprite['variables'] = {}
        proj['extensions'] = list(extensions)
        if board:
            proj['board'] = board
        else:
            proj.pop('board', None)
        with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
            z.writestr('project.json', json.dumps(proj, ensure_ascii=False))
            for f in os.listdir(TEMPLATE):
                if f != 'project.json':
                    z.write(os.path.join(TEMPLATE, f), f)


BOOLEAN_OPS = {'operator_lt', 'operator_gt', 'operator_equals', 'operator_and', 'operator_or',
               'operator_not', 'thingBotC3_switch', 'ps2_getButton'}

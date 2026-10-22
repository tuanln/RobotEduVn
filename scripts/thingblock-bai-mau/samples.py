"""Bài kiểm tra ThingBot + 15 chương trình của 5 bài mẫu ThingBlock → public/hoc-lieu/thingblock/tep/<ma-bai>-v<n>.tb

Chạy: python3 scripts/thingblock-bai-mau/samples.py. Sửa chương trình ở đây rồi sinh lại, đừng sửa tay tệp .tb.
layout/*.tops.json là kích thước từng chồng khối đo trong ThingBlock, dùng để xếp khối khỏi chồng lên nhau.

Chân trên ThingBot: cảm biến 1 dây (DHT11, dải LED RGB) ở IO4; siêu âm TRIG IO0, ECHO IO4;
OLED cắm cổng I2C; nút SW, LED 1/2, còi là đồ có sẵn trên bo.
"""
import os
from tbgen import *

OUT = os.path.join(HERE, '..', '..', 'public', 'hoc-lieu', 'thingblock', 'tep')
os.makedirs(OUT, exist_ok=True)
LIVE = dict(extensions=['thingbotTelemetrix'])
def board(*peri): return dict(board={'device': 'thingbot', 'peripherals': list(peri)},
                              extensions=['thingBotC3', *peri])
STOP_KEY = [SPACE(), l_motor(1, 0), l_motor(2, 0)]

import json
CODE = os.path.join(HERE, 'layout')

def layout(name, count):
    """Xếp các chồng khối thành hàng ngang theo kích thước đo được ở lần dựng trước."""
    f = os.path.join(CODE, f'{name}.tops.json')
    if not os.path.exists(f):
        return [(40 + 520 * i, 40) for i in range(count)]
    sizes = json.load(open(f))
    pos, x, y, row_h = [], 40, 40, 0
    for t in sizes:
        if x > 40 and x + t['w'] > 1500:
            x, y, row_h = 40, y + row_h + 60, 0
        pos.append((x, y))
        x += t['w'] + 60
        row_h = max(row_h, t['h'])
    return pos

def save(name, scripts, defs=(), float_vars=(), at=None, **kw):
    p = Project(name)
    pos = at or layout(name, len(scripts) + len(defs))
    for s, (x, y) in zip(scripts, pos):
        p.script(s, x, y)
    for (dname, body), (x, y) in zip(defs, pos[len(scripts):]):
        p.define(dname, body, x, y)
    p.save(os.path.join(OUT, f'{name}.tb'), float_vars=float_vars, **kw)

# ---- K2-M02 Robot vũ công ------------------------------------------------------
save('k2-robot-vu-cong-v1', [
    [FLAG(), l_motor(1, 50), l_motor(2, 50), wait(2), l_motor(1, 0), l_motor(2, 0)],
    STOP_KEY], **LIVE)
save('k2-robot-vu-cong-v2', [
    [FLAG(), REPEAT(4,
        l_led(1, True), l_motor(1, 60), wait(0.5), l_motor(1, 0), l_led(1, False),
        l_led(2, True), l_motor(2, 60), wait(0.5), l_motor(2, 0), l_led(2, False))],
    STOP_KEY], **LIVE)
save('k2-robot-vu-cong-v3', [
    [BEGIN(), note('C', 4, 0.5), note('E', 4, 0.5), note('G', 4, 1)],
    [LOOP(),
     led(1, 100), motor(1, 'forward', 60), motor(2, 'backward', 60), wait(1),
     led(1, 0), led(2, 100), motor(1, 'backward', 60), motor(2, 'forward', 60), wait(1),
     led(2, 0), motor(1, 'forward', 0), motor(2, 'forward', 0), wait(2)]],
    **board())

# ---- K3-M04 Đèn giao thông -------------------------------------------------------
# Module LED 3 chân cắm cổng S: S1 đỏ, S2 vàng, S3 xanh. Xung 4095 = sáng hẳn, 0 = tắt.
RED, YELLOW, GREEN = 1, 2, 3
def light(on, _=None): return [sport(n, 4095 if n == on else 0) for n in (1, 2, 3)]
save('k3-den-giao-thong-v1', [
    [LOOP(), *light(GREEN), wait(5), *light(YELLOW), wait(2), *light(RED), wait(5)]],
    **board())
save('k3-den-giao-thong-v2', [
    [LOOP(), *light(GREEN), IF(switch(), *light(RED), wait(5))]],
    **board())
save('k3-den-giao-thong-v3', [
    [LOOP(), *light(GREEN), wait(5), *light(YELLOW), wait(2), *light(RED),
     IF(switch(), wait(3)), wait(5)]],
    **board())

# ---- K4-M04 Nhiệt kế -------------------------------------------------------------
save('k4-nhiet-ke-v1', [
    [FLAG(), l_dht(4), FOREVER(printv(l_temp(4)), wait(2))]], **LIVE)
save('k4-nhiet-ke-v2', [
    [FLAG(), l_dht(4), setv('ngưỡng', num(30)),
     FOREVER(IFELSE(gt(l_temp(4), var('ngưỡng')),
                    [l_led(2, True), l_led(1, False)],
                    [l_led(2, False), l_led(1, True)]),
             wait(1))]], **LIVE)
save('k4-nhiet-ke-v3', [
    [BEGIN(), dht_init(4), setv('ngưỡng', num(30)), wait(2)],
    [LOOP(), setv('nhiệt', dht_temp()),
     IFELSE(gt(var('nhiệt'), var('ngưỡng')),
            [led(2, 100), led(1, 0)],
            [led(2, 0), led(1, 100)]),
     wait(2)]],
    float_vars=['nhiệt'], **board('dht'))

# ---- K6-M04 Trạm khí tượng -------------------------------------------------------
save('k6-tram-khi-tuong-v1', [
    [BEGIN(), dht_init(4), ser_begin(115200)],
    [LOOP(), ser_print(txt('Nhiet do: ')), ser_print(dht_temp()),
     ser_print(txt(' Do am: ')), ser_println(dht_hum()), wait(2)]],
    **board('dht', 'serial'))
def row(y, label, v): return [oled_cur(0, y), oled_print(txt(label)), oled_print(v)]
save('k6-tram-khi-tuong-v2', [
    [BEGIN(), dht_init(4), oled_init(), oled_text(1), setv('số lần đo', num(0))],
    [LOOP(), setv('nhiệt', dht_temp()), setv('ẩm', dht_hum()), chg('số lần đo', num(1)),
     oled_clear(), *row(0, 'Nhiet: ', var('nhiệt')), *row(16, 'Am: ', var('ẩm')),
     *row(48, 'Lan do: ', var('số lần đo')), oled_refresh(), wait(2)]],
    float_vars=['nhiệt', 'ẩm'], **board('dht', 'oled'))
save('k6-tram-khi-tuong-v3', [
    [BEGIN(), dht_init(4), oled_init(), oled_text(1)],
    [LOOP(), setv('nhiệt', dht_temp()), setv('ẩm', dht_hum()),
     oled_clear(), *row(0, 'Nhiet: ', var('nhiệt')), *row(16, 'Am: ', var('ẩm')), oled_cur(0, 40),
     IFELSE(gt(var('nhiệt'), num(33)),
            [oled_print(txt('NONG')), led(1, 100)],
            [IFELSE(gt(var('ẩm'), num(80)),
                    [oled_print(txt('AM UOT')), led(1, 100)],
                    [oled_print(txt('DE CHIU')), led(1, 0)])]),
     oled_refresh(), wait(2)]],
    float_vars=['nhiệt', 'ẩm'], **board('dht', 'oled'))

# ---- R4U-M03 Robot cảm nhận ------------------------------------------------------
def go(a, b, s): return [motor(1, a, s), motor(2, b, s)]
NEAR = lambda lim: AND(gt(var('khoảng cách'), num(0)), lt(var('khoảng cách'), num(lim)))
MEASURE = setv('khoảng cách', sonar(0, 4))
save('r4u-robot-cam-nhan-v1', [
    [LOOP(), MEASURE,
     IFELSE(NEAR(20),
            [*go('forward', 'forward', 0), note('C', 5, 0.25)],
            go('forward', 'forward', 50)),
     wait(0.05)]],
    **board('ultrasonic'))
save('r4u-robot-cam-nhan-v2', [
    [BEGIN(), setv('số lần né', num(0))],
    [LOOP(), MEASURE,
     IFELSE(NEAR(10),
            [chg('số lần né', num(1)), *go('backward', 'backward', 50), wait(0.6),
             *go('forward', 'backward', 50), wait(0.4)],
            [IFELSE(NEAR(25), go('forward', 'forward', 30), go('forward', 'forward', 70))]),
     wait(0.05)]],
    **board('ultrasonic'))
save('r4u-robot-cam-nhan-v3', [
    [BEGIN(), ps2_init(), setv('tự động', num(1))],
    [LOOP(), ps2_read(),
     IF(ps2_btn('PSB_START'), setv('tự động', sub(num(1), var('tự động'))), wait(0.5)),
     IFELSE(eq(var('tự động'), num(1)), [call('tự lái')], [call('lái tay')]),
     wait(0.02)]],
    defs=[
        ('tự lái', [MEASURE,
                    IFELSE(NEAR(15), go('forward', 'backward', 60), go('forward', 'forward', 60))]),
        ('lái tay', [IFELSE(ps2_btn('PSB_PAD_UP'), go('forward', 'forward', 60), [
                     IFELSE(ps2_btn('PSB_PAD_DOWN'), go('backward', 'backward', 60), [
                     IFELSE(ps2_btn('PSB_PAD_LEFT'), go('backward', 'forward', 60), [
                     IFELSE(ps2_btn('PSB_PAD_RIGHT'), go('forward', 'backward', 60),
                            go('forward', 'forward', 0))])])])]),
    ],
    **board('ultrasonic'))
# ---- Kiểm tra ThingBot (trang Làm quen ThingBot) -----------------------------------
# LED 1 sáng = chờ bấm SW. Bấm SW: LED 2 sáng, M1→M4 lần lượt chạy tiến 1 giây, servo S1 quay 0→180→90.
def try_motor(m): return [ser_println(txt(f'M{m} chay tien')), motor(m, 'forward', 60), wait(1),
                          motor(m, 'forward', 0), wait(0.5)]
save('kiem-tra-thingbot', [
    [BEGIN(), ser_begin(115200), note('C', 4, 0.5), note('E', 4, 0.5), note('G', 4, 1),
     ser_println(txt('ThingBot san sang. Bam nut SW de kiem tra.'))],
    [LOOP(), led(1, 100), wait_until(switch()), led(1, 0), led(2, 100),
     call('thử động cơ'), call('thử servo'), led(2, 0), ser_println(txt('Xong. Bam SW de thu lai.'))]],
    defs=[
        ('thử động cơ', [*try_motor(1), *try_motor(2), *try_motor(3), *try_motor(4)]),
        ('thử servo', [ser_println(txt('Servo S1: 0 - 180 - 90 do')), servo(1, 0), wait(1),
                       servo(1, 180), wait(1), servo(1, 90), wait(1)]),
    ],
    at=[(40, 40), (560, 40), (1080, 40), (40, 420)],  # thử servo nằm dưới khối khởi động
    **board('serial'))
print('\n'.join(sorted(f for f in os.listdir(OUT) if f.endswith('.tb'))))

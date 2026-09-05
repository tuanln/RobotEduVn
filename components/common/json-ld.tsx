import { SITE } from "@/lib/site";

/**
 * Dữ liệu có cấu trúc cho Google — giúp kết quả tìm kiếm hiện đúng tên tổ chức,
 * logo và kênh liên hệ thay vì chỉ một dòng chữ.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.name,
    alternateName: "OpenSTEM Foundation",
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    areaServed: { "@type": "Country", name: "Việt Nam" },
    sameAs: [...SITE.social],
    founder: SITE.founders.map((name) => ({ "@type": "Organization", name })),
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Trẻ em 4–18 tuổi",
    },
  };

  return (
    <script
      type="application/ld+json"
      // Dữ liệu là hằng số trong mã nguồn, không đến từ người dùng.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

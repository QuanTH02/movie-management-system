"use client";

interface Country {
  countryorigin_id?: number;
  country_origin_name?: string;
  country_name?: string;
}

interface Language {
  language_id?: number;
  language_name: string;
}

interface Location {
  location_name?: string;
  filminglocations_name?: string;
}

interface Company {
  productioncompanies_id?: number;
  company_name?: string;
  productioncompanies_name?: string;
}

interface DetailsSectionProps {
  releaseDate?: string | null;
  countries?: Country[];
  languages?: Language[];
  locations?: Location[];
  companies?: Company[];
}

function DetailsSection({
  releaseDate,
  countries,
  languages,
  locations,
  companies,
}: DetailsSectionProps) {
  return (
    <div className="mb-8">
      <div className="space-y-4">
        {releaseDate && releaseDate.trim() && (
          <div>
            <span className="text-dark-text font-semibold mr-2">
              Release date:
            </span>
            <span className="text-dark-text-secondary">{releaseDate}</span>
          </div>
        )}

        {countries && countries.length > 0 && (
          <div>
            <span className="text-dark-text font-semibold mr-2">
              Countries of origin:
            </span>
            {countries.map((country, index) => (
              <span key={country.countryorigin_id || index}>
                <a
                  href="#"
                  className="text-link-DEFAULT hover:text-link-hover transition-colors duration-hover"
                >
                  {String(
                    country.country_origin_name || country.country_name || "",
                  )}
                </a>
                {index < countries.length - 1 && (
                  <span className="mx-2 text-dark-text-secondary">•</span>
                )}
              </span>
            ))}
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <span className="text-dark-text font-semibold mr-2">Language:</span>
            {languages.map((lang, index) => (
              <span key={lang.language_id || index}>
                <span className="text-dark-text-secondary">
                  {lang.language_name}
                </span>
                {index < languages.length - 1 && (
                  <span className="mx-2 text-dark-text-secondary">•</span>
                )}
              </span>
            ))}
          </div>
        )}

        {locations && locations.length > 0 && (
          <div>
            <span className="text-dark-text font-semibold mr-2">
              Filming locations:
            </span>
            <span className="text-dark-text-secondary">
              {locations
                .map((loc) =>
                  String(loc.location_name || loc.filminglocations_name || ""),
                )
                .join(", ")}
            </span>
          </div>
        )}

        {companies && companies.length > 0 && (
          <div>
            <span className="text-dark-text font-semibold mr-2">
              Production companies:
            </span>
            {companies.map((company, index) => (
              <span key={company.productioncompanies_id || index}>
                <a
                  href="#"
                  className="text-link-DEFAULT hover:text-link-hover transition-colors duration-hover"
                >
                  {String(
                    company.company_name ||
                      company.productioncompanies_name ||
                      "",
                  )}
                </a>
                {index < companies.length - 1 && (
                  <span className="mx-2 text-dark-text-secondary">•</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsSection;
export type { DetailsSectionProps };

import React from "react";
import ReactCountryFlag from "react-country-flag";

type CountrySessionData = {
  countryName: string;
  countryCode: string; // This should be the country's ISO 3166-1-alpha-2 code
  sessions: number;
};

const CountrySessions: React.FC = () => {
  const countryData: CountrySessionData[] = [
    { countryName: "United States", countryCode: "US", sessions: 32190 },
    { countryName: "Germany", countryCode: "DE", sessions: 8798 },
    { countryName: "VietNam", countryCode: "VN", sessions: 8798 },
    // ... add other countries
  ];

  return (
    <div className="bg-blackA4 rounded-md w-full mt-3">
      <div className=" py-4 px-4 border-b-[1.5px] border-gray8">
        <h2 className="headingAdmin !text-[15px]">Visitors By Countries</h2>
      </div>
      <div className="flex flex-col py-3 px-2 gap-2">
        {countryData.map((country, index) => (
          <div key={index} className="flex items-center justify-between mb-4  ">
            <div className="flex items-center gap-5">
              <div className="w-[30px] h-[30px] rounded-full ">
                <ReactCountryFlag
                  countryCode={country.countryCode}
                  svg
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                  className="rounded-full h-full w-full object-cover"
                />
              </div>
              <div className="">{country.countryName}</div>
            </div>
            <span className="bg-black px-1 py-1 rounded-md text-[14px]">
              {country.sessions.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySessions;

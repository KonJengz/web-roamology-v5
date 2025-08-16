import { MapPin } from "lucide-react";

function HeadForm({ text, detail, italicized, countryName, placeName }) {
  return (
    <div>
      {(countryName || placeName) && (
        <small className="text-xs text-gray-400 font-light flex items-center">
          <MapPin width={14} /> {countryName} / {placeName}
        </small>
      )}
      <h1 className="text-3xl text-roamology font-light mb-1">
        {text} <i>{italicized}</i>
      </h1>
      <p className="text-sm text-gray-600">{detail}</p>
    </div>
  );
}
export default HeadForm;

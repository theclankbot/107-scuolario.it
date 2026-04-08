import SchoolCard, { type SchoolCardSchool } from "./SchoolCard";

interface NearbySchoolsProps {
  schools: SchoolCardSchool[];
}

export default function NearbySchools({ schools }: NearbySchoolsProps) {
  if (schools.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-text">Scuole nelle vicinanze</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {schools.slice(0, 6).map((school) => (
          <SchoolCard key={school.schoolCode} school={school} />
        ))}
      </div>
    </section>
  );
}

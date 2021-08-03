import Person from "./Person";

const People = ({ peopleProps, colors }) => (
  <section className="groupPeople my-8 grid gap-4 xs:gap-6 md:gap-8 grid-cols-2 md:grid-cols-4">
    {peopleProps.map((item) => {
      const { _id, name, job, area, bio, image } = item.groupPeopleResolved;
      return (
        <Person
          key={_id}
          name={name}
          job={job}
          area={area}
          bio={bio}
          image={image}
          colors={colors}
        />
      );
    })}
  </section>
);

export default People;

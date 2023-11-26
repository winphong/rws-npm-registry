import { Divider } from "@blueprintjs/core";
import _ from "lodash";

const Contributors = ({
  title,
  people,
}: {
  title: string;
  people: Array<{ name: string; email: string }>;
}) => {
  return (
    <>
      <span>{title}</span>
      <Divider />
      {_.map(people, (person, index) => {
        if (index === people.length - 1) {
          return (
            <span className="bp5-text-muted" key={person.email}>
              {person.name}
            </span>
          );
        }
        return (
          <span className="bp5-text-muted" key={person.email}>
            {person.name},{" "}
          </span>
        );
      })}
    </>
  );
};

export default Contributors;

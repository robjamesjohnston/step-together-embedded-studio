import GroupButton from "./GroupButton";

const GroupButtons = ({ groupButtons, backupCol }) => (
  <section className="client-group-buttons my-8 grid gap-4 xs:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
    {groupButtons.map((item) => (
      <GroupButton
        key={item._key}
        title={item.title}
        text={item.text}
        bgCol={item.clientGroupHighlightCol}
        backupCol={backupCol}
        target={item.target}
      />
    ))}
  </section>
);

export default GroupButtons;

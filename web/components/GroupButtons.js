import GroupButton from "./GroupButton";

const GroupButtons = ({ groupButtons, backupCol }) => (
  <section className="client-group-buttons my-8 grid gap-4 xs:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
    {groupButtons.map((item) => {
      const { _key, title, text, clientGroupHighlightCol, target } = item;
      return (
        <GroupButton
          key={_key}
          title={title}
          text={text}
          bgCol={clientGroupHighlightCol}
          target={target}
          backupCol={backupCol}
        />
      );
    })}
  </section>
);

export default GroupButtons;

import GroupButton from "./GroupButton";

const GroupButtons = ({ buttons, backupCol }) => (
  <section className="client-group-buttons section-margin my-8 grid gap-4 xs:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
    {buttons.map((item) => {
      const { _key, title, text, clientGroupHighlightCol, link } = item;
      return (
        <GroupButton
          key={_key}
          title={title}
          text={text}
          bgCol={clientGroupHighlightCol ? `bg-${clientGroupHighlightCol}` : backupCol}
          link={link}
        />
      );
    })}
  </section>
);

export default GroupButtons;

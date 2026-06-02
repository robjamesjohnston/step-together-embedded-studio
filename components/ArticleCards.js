import ArticleCard from "./ArticleCard";

const COLOR_MAP = {
  red: "bg-red",
  orange: "bg-orange",
  lightGreen: "bg-lightGreen",
  green: "bg-green",
  lime: "bg-lime",
  darkGrey: "bg-darkGrey",
};

const ArticleCards = ({ articles, backupCol }) => (
  <section className="article-cards section-margin my-8 grid gap-4 xs:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
    {articles.map((item) => {
      const { _key, image, title, text, clientGroupHighlightCol, link } = item;
      return (
        <ArticleCard
          key={_key}
          image={image}
          title={title}
          text={text}
          bgCol={clientGroupHighlightCol ? COLOR_MAP[clientGroupHighlightCol] || backupCol : backupCol}
          link={link}
        />
      );
    })}
  </section>
);

export default ArticleCards;

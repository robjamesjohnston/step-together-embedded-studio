import ArticleCard from "./ArticleCard";

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
          bgCol={clientGroupHighlightCol ? `bg-${clientGroupHighlightCol}` : backupCol}
          link={link}
        />
      );
    })}
  </section>
);

export default ArticleCards;

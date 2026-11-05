
import "./Community.css";

import { useCommunity } from "./hooks/useCommunity";

import CommunityHero from "./components/CommunityHero";
import CommunityFeed from "./components/CommunityFeed";
import CommunitySidebar from "./components/CommunitySidebar";
import WishComposer from "./components/WishComposer";
import WishComments from "./components/WishComments";

function Community() {
  const community = useCommunity();

  const handleCreatePost = (visibility = "public") => {
    community.openComposer(visibility);
  };

  const handleCreatePrivatePost = () => {
    community.openComposer("private", "Outras ideias");
  };

  const handleShowModerationNotice = () => {
    community.showNotice(
      "As opções de denúncia e moderação serão conectadas ao backend."
    );
  };

  return (
    <main className="community-page">
      <CommunityHero
        onCreatePost={() => handleCreatePost("public")}
      />

      <section className="community-intro-row">
        <div>
          <span className="community-kicker">
            A COMUNIDADE
          </span>

          <h2>
            Uma marca também é feita
            <br />
            por quem a vive.
          </h2>
        </div>

        <p>
          Compartilhe o que gostaria de encontrar por aqui. Suas
          ideias ajudam a orientar novas possibilidades, aprimorar
          a experiência e construir os próximos capítulos da Noir
          Avenue.
        </p>
      </section>

      <section className="community-workspace">
        <CommunityFeed
          categories={community.categories}
          visiblePosts={community.visiblePosts}
          currentUser={community.currentUser}
          activeCategory={community.activeCategory}
          onSelectCategory={community.selectCategory}
          feedView={community.feedView}
          onChangeFeedView={community.changeFeedView}
          sort={community.sort}
          onSortChange={community.setSort}
          search={community.search}
          onSearchChange={community.setSearch}
          onClearSearch={community.clearSearch}
          notice={community.notice}
          onRemoveNotice={() => community.setNotice("")}
          onCreatePost={handleCreatePost}
          onOpenDiscussion={community.openDiscussion}
          onToggleLike={community.toggleLike}
          onRemovePost={community.removeOwnPost}
          onNotice={handleShowModerationNotice}
        />

        <CommunitySidebar
          onCreatePost={() => handleCreatePost("public")}
          onCreatePrivatePost={handleCreatePrivatePost}
          onSelectCategory={community.selectCategory}
        />
      </section>

      <WishComposer
        open={community.composerOpen}
        form={community.form}
        categories={community.categories}
        onFormChange={community.updateForm}
        onSubmit={community.publishPost}
        onClose={community.closeComposer}
      />

      <WishComments
        post={community.selectedPost}
        comment={community.comment}
        onCommentChange={community.setComment}
        onAddComment={community.addComment}
        onClose={community.closeDiscussion}
      />
    </main>
  );
}

export default Community;

import { useEffect, useState, useRef } from 'react';
import { usePostsWithComments } from '../../shared/hooks/usePostsWithComments';
import { useProfile } from '../../shared/hooks/useProfile';
import { FaHeart } from 'react-icons/fa';
import '../../pages/Home/postsFeed.css';

export const PostsFeed = () => {
  const { posts, loading, fetchPosts, handleCreateComment, commentLoading } = usePostsWithComments();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [dateFilter, setDateFilter] = useState('recent');
  const [exactDate, setExactDate] = useState('');

  const [showAuthorSuggestions, setShowAuthorSuggestions] = useState(false);
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const authors = [...new Set(posts.map(post => `${post.createdBy.name} ${post.createdBy.surname}`))];
  const courses = [...new Set(posts.map(post => post.course))];

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      `${post.createdBy.name} ${post.createdBy.surname}`.toLowerCase().includes(searchAuthor.toLowerCase()) &&
      post.course.toLowerCase().includes(searchCourse.toLowerCase()) &&
      (dateFilter !== 'exact' || new Date(post.date).toLocaleDateString('sv-SE') === exactDate)
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateFilter === 'recent') return dateB - dateA;
      if (dateFilter === 'oldest') return dateA - dateB;
      return 0;
    });

  const filteredAuthorSuggestions = authors.filter(author =>
    author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
    author.toLowerCase() !== searchAuthor.toLowerCase()
  );

  const filteredCourseSuggestions = courses.filter(course =>
    course.toLowerCase().includes(searchCourse.toLowerCase()) &&
    course.toLowerCase() !== searchCourse.toLowerCase()
  );

  if (loading) return <p className="loading-text">Cargando publicaciones...</p>;

  return (
    <div className="feed-container">
      <div className="search-bar">

        <div className="search-field">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="autocomplete">
          <input
            type="text"
            placeholder="Buscar por autor"
            value={searchAuthor}
            onChange={(e) => {
              setSearchAuthor(e.target.value);
              setShowAuthorSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowAuthorSuggestions(false), 100)}
            onFocus={() => searchAuthor && setShowAuthorSuggestions(true)}
          />
          {showAuthorSuggestions && filteredAuthorSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredAuthorSuggestions.map((author, i) => (
                <li key={i} onClick={() => {
                  setSearchAuthor(author);
                  setShowAuthorSuggestions(false);
                }}>
                  {author}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="autocomplete">
          <input
            type="text"
            placeholder="Buscar por curso"
            value={searchCourse}
            onChange={(e) => {
              setSearchCourse(e.target.value);
              setShowCourseSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 100)}
            onFocus={() => searchCourse && setShowCourseSuggestions(true)}
          />
          {showCourseSuggestions && filteredCourseSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredCourseSuggestions.map((course, i) => (
                <li key={i} onClick={() => {
                  setSearchCourse(course);
                  setShowCourseSuggestions(false);
                }}>
                  {course}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-field">
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="recent">Más reciente</option>
            <option value="oldest">Más antigua</option>
            <option value="exact">Fecha exacta</option>
          </select>
        </div>

        {dateFilter === 'exact' && (
          <div className="search-field">
            <input
              type="date"
              value={exactDate}
              onChange={(e) => setExactDate(e.target.value)}
            />
          </div>
        )}
      </div>

      {filteredPosts.map((post) => (
        <div key={post._id} className="post-wrapper">
          <PostCard
            post={post}
            handleCreateComment={handleCreateComment}
            commentLoading={commentLoading}
          />
        </div>
      ))}
    </div>
  );
};
const PostCard = ({ post, handleCreateComment, commentLoading }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [imgSrc, setImgSrc] = useState(`/${post.postPicture}`);
  const [showVideo, setShowVideo] = useState(false);
  const [commentData, setCommentData] = useState({ name: '', surname: '', content: '' });

  const { likePost } = useProfile();
  const likedPosts = useRef(new Set());
  const likeSound = typeof Audio !== 'undefined' ? new Audio('/Efecto_Sonido.mp3') : null;

  const toggleDesc = () => setShowFullDesc(!showFullDesc);
  const toggleComments = () => setShowComments(!showComments);

  const handleLike = async () => {
    if (likedPosts.current.has(post._id)) return;

    likeSound?.play();

    const response = await likePost(post._id);
    if (!response.error) {
      setLikesCount((prev) => prev + 1);
      likedPosts.current.add(post._id);
      setHasLiked(true);
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 300);
    }
  };

  const submitComment = async () => {
    const { name, surname, content } = commentData;
    if (!name || !surname || !content) return;

    await handleCreateComment({
      post: post._id,
      name,
      surname,
      content,
    });

    setCommentData({ name: '', surname: '', content: '' });
  };

  const getDefaultImage = (course) => {
    switch (course.toUpperCase()) {
      case 'TALLER III':
        return '/Taller III.gif';
      case 'TECNOLOGÍA III':
        return '/Tecnología III.gif';
      case 'PRÁCTICA SUPERVISADA':
        return '/Práctica Supervisada.gif';
      default:
        return '/fox_logo.png';
    }
  };

  const extractVideoUrl = (description) => {
    const urlRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:shorts\/[\w-]+|watch\?v=[\w-]{11})|youtu\.be\/[\w-]{11}|[\w\-./?%&=]+\.mp4))/gi;
    const matches = description.match(urlRegex);
    return matches ? matches[0].trim() : null;
  };

  const getYouTubeID = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch))\??(?:\S*?v=)?|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const videoUrl = extractVideoUrl(post.description);

  return (
    <div className="post-card animated">
      <div className="post-header">
        <div>
          <span className="post-author">{post.createdBy.name} {post.createdBy.surname}</span> · {post.course}
        </div>
        <div className="post-date">{new Date(post.date).toLocaleDateString()}</div>
      </div>

      <h2 className="post-title">{post.title}</h2>

      <div className={`post-description ${showFullDesc ? 'show-full' : ''}`}>
        <p className="post-text">
          {linkifyText(showFullDesc ? post.description : `${post.description.slice(0, 120)}...`)}
        </p>
        {post.description.length > 120 && (
          <button onClick={toggleDesc} className="toggle-button">
            {showFullDesc ? 'Ver menos' : 'Leer más'}
          </button>
        )}
      </div>

      {(post.postPicture || videoUrl) && (
        <>
          <div style={{ marginTop: '0.7rem' }}>
            {showVideo && videoUrl ? (
              videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeID(videoUrl)}`}
                  title="Video del post"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="post-image"
                ></iframe>
              ) : (
                <video controls width="100%" className="post-image">
                  <source src={videoUrl} type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              )
            ) : (
              post.postPicture && (
                <img
                  src={imgSrc}
                  alt="Imagen del post"
                  className="post-image"
                  onError={() => setImgSrc(getDefaultImage(post.course))}
                />
              )
            )}
          </div>

          {post.postPicture && videoUrl && (
            <button onClick={() => setShowVideo(!showVideo)} className="toggle-button">
              {showVideo ? 'Ver imagen' : 'Ver video'}
            </button>
          )}
        </>
      )}

      <div
        className={`post-likes ${hasLiked ? 'liked' : ''}`}
        onClick={handleLike}
        style={{ cursor: hasLiked ? 'default' : 'pointer', opacity: hasLiked ? 0.9 : 1 }}
      >
        <FaHeart className={`like-icon ${animateLike ? 'animate' : ''}`} />
        <span>{likesCount} Me gusta</span>
      </div>

      <button onClick={toggleComments} className="toggle-button">
        {showComments ? 'Ocultar comentarios' : 'Leer comentarios'}
      </button>

      {showComments && (
        <div className="post-comments">
          {post.comments.length === 0 ? (
            <p className="comment">No hay comentarios aún.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment._id} className="comment-bubble">
                <img src="/user-icon.png" alt="Usuario" className="comment-avatar" />
                <div className="comment-text">
                  <span className="comment-author">
                    {comment.name} {comment.surname}:
                  </span>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}

          <div className="comment-form">
            <input
              type="text"
              placeholder="Nombre"
              value={commentData.name}
              onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={commentData.surname}
              onChange={(e) => setCommentData({ ...commentData, surname: e.target.value })}
            />
            <textarea
              placeholder="Escribe un comentario..."
              value={commentData.content}
              onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
            />
            <button onClick={submitComment} disabled={commentLoading}>
              {commentLoading ? 'Publicando...' : 'Publicar comentario'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


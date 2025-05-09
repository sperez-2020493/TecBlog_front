import { useEffect } from 'react';
import { useProfile } from '../../shared/hooks/useProfile';
import '../../pages/home/homePage.css';

export const NavbarHome = () => {
  const { profile, profilePicture, loading, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Cargando perfil...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10 text-red-500">No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div className="profile-container">
      <div
        className="profile-banner"
        style={{ backgroundImage: 'url("../../../public/fox_logo.png")' }}
      >
        <img
          src={profilePicture}
          alt="Foto de perfil"
          className="profile-picture"
        />
      </div>

      <div className="profile-info">
        <h1>{profile.name} {profile.surname}</h1>
        <p>{profile.email}</p>

        <div className="profile-stats">
          <div className="profile-stat">
            <span>{profile.likesTotal}</span>
            Likes
          </div>
          <div className="profile-stat">
            <span>{profile.postsTotal}</span>
            Posts
          </div>
        </div>
      </div>
    </div>
  );
};
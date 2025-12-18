export default function UserCard({
  name,
  bio,
  company,
  followers,
  following,
  location,
  avatar_url,
}) {
  const isFound = name && name != "Not Found";
  const userIcon = "/assets/images/user-regular-full.svg";
  const avatar_url_img = avatar_url ? avatar_url : userIcon;
  return (
    <div className="profile-card">
      <div className="profile-avatar-wrapper">
        <img
          src={avatar_url_img}
          alt="profile-avatar"
          className="profile-img"
        />
      </div>

      <h2>{name}</h2>
      <p>{bio}</p>
      <p>{company}</p>

      {isFound && (
        <div className="follow-info">
          <div className="follow followers">
            <img
              src="/assets/images/arrow-turn-down-solid-full.svg"
              alt="followers"
            />
            <span className="stat">Follower</span>
            <span className="number">{followers}</span>
          </div>

          <div className="follow following">
            <img
              src="/assets/images/arrow-turn-up-solid-full.svg"
              alt="following"
            />
            <span className="stat">Following</span>
            <span className="number">{following}</span>
          </div>
        </div>
      )}
      {isFound && (
        <div className="location-info">
          <img
            src="/assets/images/location.svg"
            alt="location"
            className="location-img"
          />
          <span>{location}</span>
        </div>
      )}
    </div>
  );
}

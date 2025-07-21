import { useSelector } from "react-redux";

const Profile = () => {
  // get the user from the store
  const { user } = useSelector((state) => state.auth);

  // done loading if user is null
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-600">
        <p className="text-xl text-teal-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center bg-zinc-50 px-4">
      <section className="flex flex-col items-center text-center gap-6 max-w-sm w-full  p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-teal-500">Your Profile</h1>

        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-teal-500 flex items-center justify-center cursor-default select-none">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-5xl font-extrabold text-white capitalize">
              {user.username.charAt(0)}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-semibold text-teal-500 capitalize">
          {user.username}
        </h2>

        <p className="text-lg font-medium text-gray-700 break-words">
          {user.email}
        </p>

        <label htmlFor="password" className="sr-only">
          Password (disabled)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          disabled
          placeholder="••••••••"
          className="w-full py-2 px-3 border-y-2 border-teal-500  text-center text-teal-600 placeholder-teal-400 cursor-not-allowed"
          aria-disabled="true"
        />

        <button
          type="button"
          disabled
          className="w-full bg-teal-500 text-white py-2 rounded mt-4 opacity-60 cursor-not-allowed transition-colors duration-150"
          aria-disabled="true"
        >
          Update
        </button>
      </section>
    </main>
  );
};

export default Profile;

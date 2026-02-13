export default function Navbar({ title }) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");


  return (
    <div className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="bg-white text-blue-700 font-bold px-3 py-1 rounded">
          IQAC
        </div>

        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm capitalize">
          Role: {role} | Name: {name}
        </span>

        <button
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
          className="bg-red-500 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

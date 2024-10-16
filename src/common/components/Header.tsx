
function Header({ title }) {
  return (
    <header className="bg-gray-200 p-3 rounded-md shadow-lg mb-5">
      <h1 className="text-4xl font-bold text-gray-500">{title}</h1>
    </header>
  );
}

export default Header;

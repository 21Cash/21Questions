export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-gray-800 w-full">
      <div className="w-full border-t-2 border-t-black dark:border-t-white py-4 text-center">
        <p>&copy; {currentYear} 21Question by 21Cash</p>
      </div>
    </footer>
  );
}

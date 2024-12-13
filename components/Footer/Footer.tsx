export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div
        className="w-full py-4 text-center backdrop-blur-sm  
         dark:from-gray-800 dark:via-black dark:to-gray-900 
        bg-opacity-20 dark:bg-opacity-70"
      >
        <p className="dark:text-white text-lg font-light ">
          &copy; {currentYear} 21Questions by 21Cash
        </p>
      </div>
    </footer>
  );
}

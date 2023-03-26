function Footer() {
  return (
    <footer className="flex justify-center items-center w-full h-16 text-white bg-black">
      <p className="text-center bg-black">
        © 2023 João Borges Mendonça. All rights reserved. |{" "}
        <a
          href="https://www.yourportfolio.com"
          alt="link to João Borges Mendonça portfolio"
          className="underline hover:text-gray-300 bg-black"
        >
          Portfolio
        </a>
      </p>
    </footer>
  );
}
export default Footer;
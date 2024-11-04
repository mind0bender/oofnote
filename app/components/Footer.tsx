import Link from "next/link";

function Footer(): JSX.Element {
  return (
    <footer
      className={`flex flex-col justify-center items-center gap-2 py-4 px-8 text-stone-300 border-t bg-black border-t-stone-700`}>
      <table className={`w-full border-stone-700`}>
        <thead className={`w-full border-inherit`}>
          <tr className={`border-inherit`}>
            <td className={`py-2`}>
              <Link
                href={`/`}
                className={`font-semibold text-lg text-stone-50`}>
                <span className={`font-black`}>Oof</span>
                <span className={`font-thin`}>Note</span>
              </Link>
            </td>
            <td className={`border-l border-inherit h-full`}>&nbsp;</td>
            <td>Socials</td>
          </tr>
        </thead>
        <tbody className={`border-inherit`}>
          <tr className={`border-inherit`}>
            <td
              className={`flex justify-start items-start border-t border-inherit py-2`}>
              <p className={`text-sm`}>
                Made with ❤️ by&nbsp;
                <Link
                  className={`text-blue-400 hover:underline`}
                  href={`https://mind0bender.vercel.app`}
                  target={`_blank`}
                  rel={`noopener noreferrer`}>
                  mind0bender
                </Link>
              </p>
            </td>
            <td className={`border-l border-inherit h-full pr-4`}>&nbsp;</td>
            <td>
              <ul>
                <li className={`py-0.5 text-sm`}>
                  <Link
                    className={`text-blue-400 hover:underline`}
                    href={`https://github.com/mind0bender`}
                    target={`_blank`}
                    rel={`noopener noreferrer`}>
                    GitHub
                  </Link>
                </li>
                <li className={`py-0.5 text-sm`}>
                  <Link
                    className={`text-blue-400 hover:underline`}
                    href={`https://www.linkedin.com/in/yash-gupta-b962a11a5/`}
                    target={`_blank`}
                    rel={`noopener noreferrer`}>
                    Linkedin
                  </Link>
                </li>
                <li className={`py-0.5 text-sm`}>
                  <Link
                    className={`text-blue-400 hover:underline`}
                    href={`https://www.threads.net/@mind0bender251198`}
                    target={`_blank`}
                    rel={`noopener noreferrer`}>
                    Threads
                  </Link>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </footer>
  );
}

export default Footer;

'use client'
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  const pathname = usePathname();

  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;
  return (
    <Link href={href} className={`relative border p-2 round-md ${isActive ? "bg-gray-300 font-bold border-black " : " border-gray-400 "}`}>
      <p className="truncate" > {data.title} </p>

    </Link>
  );
}

export default SidebarOption;

import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { PrismaClient } from "@repo/db/client";

export default function Home() {
  return (
   <>
   <h1 className="text-4xl font-black text-gray-900 dark:text-red ">Hello there!</h1>
   </>
  );
}

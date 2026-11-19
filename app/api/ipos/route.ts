import { NextResponse } from "next/server";
import { ALL_IPOS, OFFICIAL_REGISTRARS } from "@/lib/ipo-data";

export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const open = ALL_IPOS.filter((i) => i.status === "Open");
  const upcoming = ALL_IPOS.filter((i) => i.status === "Upcoming");
  const listed = ALL_IPOS.filter((i) => i.status === "Listed");

  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      summary: {
        total: ALL_IPOS.length,
        openCount: open.length,
        upcomingCount: upcoming.length,
      },
      registrars: OFFICIAL_REGISTRARS,
      ipos: ALL_IPOS,
      categories: {
        open,
        upcoming,
        listed,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}

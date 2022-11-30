import Features from "~/components/front/Features";
import Footer from "~/components/front/Footer";
import Hero from "~/components/front/Hero";
import JoinNow from "~/components/front/JoinNow";
import { i18n } from "~/locale/i18n.server";
import { Language } from "remix-i18next";
import { getUserInfo } from "~/utils/session.server";
import { MetaFunction, LoaderFunction, json, useCatch } from "remix";

export const meta: MetaFunction = () => ({
  title: "Remix SaasFrontend",
});

type LoaderData = {
  authenticated: boolean;
  i18n: Record<string, Language>;
};

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const userInfo = await getUserInfo(request);
    const data: LoaderData = {
      authenticated: (userInfo?.userId ?? "").length > 0,
      i18n: await i18n.getTranslations(request, ["translations"]),
    };
    return json(data);
  } catch (e) {
    console.error({
      error: e,
    });
    return json({
      i18n: await i18n.getTranslations(request, ["translations"]),
    });
  }
};

export default function IndexRoute() {
  return (
    <div>
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-slate-200">
        <Hero />
        <Features className="relative z-10" />
        <JoinNow />
        <Footer />
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>{`${caught.status} ${caught.statusText}`}</h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>App Error</h1>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  );
}

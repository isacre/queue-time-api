import useConfigurePageHeader from "@/hooks/useConfigurePageHeader";

export default function ConfigPage() {
  useConfigurePageHeader({
    title: "Configurations",
  });
  return <div>ConfigPage</div>;
}

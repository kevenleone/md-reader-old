import useLang from "@/hooks/useLang";

const Index: React.FC = () => {
  const i18n = useLang();

  return (
    <div>
      <h2 className="text-blue-900 text-lg">
        Read - how_to_minimize_bleeding_themes
      </h2>
    </div>
  );
};

export default Index;

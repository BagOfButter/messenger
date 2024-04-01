import { PageContainer, PageName } from "@shared/PageContainer/ui/styled";
import FontSettings from "@widgets/FontSettings/FontSettings";
import ThemeSettings from "@widgets/ThemeSettings/ThemeSettings";

const Settings = () => {
  return (
    <PageContainer>
      <PageName>Settings</PageName>
      <ThemeSettings />
      <FontSettings />
    </PageContainer>
  );
};

export default Settings;

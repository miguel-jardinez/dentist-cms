type OnboardingOrgLayoutProps = {
  children: React.ReactNode;
};

const OnboardingOrgLayout = ({ children } : OnboardingOrgLayoutProps) => (
  <div className="bg-muted h-dvh">
    <div className="mx-auto container flex items-center justify-center h-full">
      {children}
    </div>
  </div>
);
 
export default OnboardingOrgLayout;

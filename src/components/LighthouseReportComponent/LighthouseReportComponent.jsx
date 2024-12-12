import './LighthouseReportComponent.scss';
import * as htmlContent from './template.html'; // Import HTML as a string

const LighthouseReportComponent = () => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }} // Inject raw HTML into the component
    />
  );
};

export default LighthouseReportComponent;

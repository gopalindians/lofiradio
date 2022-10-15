import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Blog category") => {
    return (action = "test action", label = "test label") => {
        ReactGA.event({category, action, label});
    };
}
export default useAnalyticsEventTracker;
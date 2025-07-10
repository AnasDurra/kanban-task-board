import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getErrorMessage = () => {
    return {
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist or has been moved.",
      code: "404",
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              {errorInfo.title}
            </h1>

            <p className="text-slate-600 mb-8 leading-relaxed">
              {errorInfo.description}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoHome}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark"
              >
                <Home className="w-4 h-4 mr-2 inline-block" />
                Go Home
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleGoBack}
                  className="flex-1 border border-secondary text-slate-800 py-2 px-4 rounded-lg hover:bg-secondary/10"
                >
                  Go Back
                </button>

                <button
                  onClick={handleRefresh}
                  className="flex-1 border border-secondary text-slate-800 py-2 px-4 rounded-lg hover:bg-secondary/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2 inline-block" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Need help?{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-slate-700 hover:text-slate-900 font-medium underline underline-offset-2"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

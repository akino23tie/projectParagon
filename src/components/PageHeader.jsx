export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (typeof breadcrumb === "string") {
      return <span className="text-gray-500">{breadcrumb}</span>;
    } else if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item, index) => (
        <span key={index} className="text-gray-500">
          {item}
          {index !== breadcrumb.length - 1 && <span className="mx-2">/</span>}
        </span>
      ));
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="flex items-center font-medium mt-2">{renderBreadcrumb()}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function SalesCard({
  icon: Icon,
  badgeIcon: BadgeIcon,
  value,
  label,
  growth,
  iconBg,
  badgeBg,
  badgeText
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-[320px]">

      {/* Top section */}
      <div className="flex justify-between items-start">

        {/* Icon */}
        <div className={`${iconBg} p-2 rounded-xl`}>
          <Icon className="text-white" size={25} />
        </div>

        {/* Badge */}
        {growth && (
          <div className={`flex items-center gap-1 ${badgeBg} ${badgeText} px-1 py-1 rounded-full text-[10px] font-medium`}>
            {BadgeIcon && <BadgeIcon size={10} />}
            {growth}
          </div>
        )}

      </div>

      {/* Value */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        {value}
      </h2>

      {/* Label */}
      <p className="text-gray-500 mt-2 text-sm">
        {label}
      </p>

    </div>
  );
}
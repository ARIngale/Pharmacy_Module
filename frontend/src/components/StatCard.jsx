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
    <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 w-full">

      {/* Top section */}
      <div className="flex justify-between items-start">

        {/* Icon */}
        <div className={`${iconBg} p-2 rounded-xl`}>
          <Icon className="text-white" size={20} />
        </div>

        {/* Badge */}
        {growth && (
          <div className={`flex items-center gap-1 ${badgeBg} ${badgeText} px-2 py-1 rounded-full text-[10px] font-medium`}>
            {BadgeIcon && <BadgeIcon size={10} />}
            {growth}
          </div>
        )}

      </div>

      {/* Value */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4 sm:mt-6">
        {value}
      </h2>

      {/* Label */}
      <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">
        {label}
      </p>

    </div>
  );
}
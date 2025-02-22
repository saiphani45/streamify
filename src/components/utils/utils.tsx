import { Avatar } from "../ui/avatar";

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
          {label}
        </p>
        {payload.map((entry: any, index: any) => (
          <p
            key={index}
            className="text-sm flex items-center gap-2"
            style={{ color: entry.color }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name}:</span>
            <span>{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};
export const LoadingFallback = () => (
  <div
    className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50/50 
    dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800/90 
    dark:bg-blend-multiply flex items-center justify-center"
  >
    <div className="relative">
      <div
        className="animate-spin rounded-full h-16 w-16 border-4 border-t-sky-500 
        border-r-slate-200 border-b-teal-500 border-l-slate-200
        dark:border-t-sky-400 dark:border-r-slate-700 
        dark:border-b-teal-400 dark:border-l-slate-700"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-50 via-slate-50 to-teal-50/50 
          dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800/90"
        />
      </div>
    </div>
  </div>
);
export const columns = [
  {
    key: "songName",
    header: "Song Name",
    sortable: true,
    filterable: true,
    render: (value: any, row: any) => (
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-teal-500 rounded-full blur-sm opacity-50" />
          <Avatar className="h-8 w-8 ring-2 ring-sky-100 dark:ring-sky-900 relative overflow-hidden">
            <img
              src={row.artistImage}
              alt={row.artist}
              className="object-cover w-8 h-8"
              loading="lazy"
              width="32"
              height="32"
            />
          </Avatar>
        </div>
        <span className="font-medium text-slate-900 dark:text-white">
          {value}
        </span>
      </div>
    ),
  },
  {
    key: "artist",
    header: "Artist",
    sortable: true,
    filterable: true,
    render: (value: any) => (
      <span className="text-sky-600 dark:text-sky-400">{value}</span>
    ),
  },
  {
    key: "dateStreamed",
    header: "Date Streamed",
    sortable: true,
    render: (value: any) =>
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    key: "streamCount",
    header: "Stream Count",
    sortable: true,
    render: (value: any) => (
      <span
        className="bg-gradient-to-r from-sky-600 to-teal-600 
          dark:from-sky-400 dark:to-teal-400 bg-clip-text text-transparent font-medium"
      >
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "userId",
    header: "User ID",
    render: (value: any) => (
      <span
        className="px-2 py-1 rounded-full bg-sky-50 dark:bg-sky-900/30 
          text-sky-600 dark:text-sky-400 text-xs"
      >
        {value}
      </span>
    ),
  },
];

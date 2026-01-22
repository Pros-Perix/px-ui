import type { Message, JobsData } from "../../context/xandi-context";
import * as XMessageActions from "../x-message-actions";

export interface JobsRendererProps {
  message: Message;
}

export function JobsRenderer({ message }: JobsRendererProps) {
  const data = message.data as JobsData | undefined;

  if (!data?.jobs) {
    return (
      <div className="text-ppx-sm text-ppx-neutral-11">
        No jobs data available.
      </div>
    );
  }

  const { jobs, pagination } = data;

  return (
    <div className="flex flex-col gap-3">
      {/* Header with count */}
      <div className="text-ppx-sm text-ppx-neutral-11">
        {message.content}
        {pagination && (
          <span className="ml-1">
            (Page {pagination.page} of {Math.ceil(pagination.total / pagination.per_page)})
          </span>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination info */}
      {pagination && pagination.total > pagination.per_page && (
        <div className="text-ppx-xs text-ppx-neutral-10">
          Showing {jobs.length} of {pagination.total} jobs
        </div>
      )}

      {/* Message Actions */}
      <div className="mt-1">
        <XMessageActions.Root>
          <XMessageActions.Feedback messageId={message.id} />
          <XMessageActions.Copy content={formatJobsForCopy(jobs)} />
          {message.debugTrace != null && (
            <XMessageActions.Debug messageId={message.id} debugTrace={message.debugTrace} />
          )}
        </XMessageActions.Root>
      </div>
    </div>
  );
}

interface JobCardProps {
  job: JobsData["jobs"][number];
}

function JobCard({ job }: JobCardProps) {
  const statusColor = getStatusColor(job.status);
  const formattedDate = formatDate(job.created_at);

  return (
    <div className="rounded-lg border border-ppx-neutral-5 bg-ppx-neutral-2 p-3 transition-colors hover:border-ppx-neutral-6">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-ppx-sm font-medium text-ppx-neutral-12">
            {job.title}
          </h4>
          <p className="mt-0.5 text-ppx-xs text-ppx-neutral-10">
            {job.office_city}, {job.office_country}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-ppx-xs font-medium ${statusColor}`}
        >
          {job.status}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between text-ppx-xs text-ppx-neutral-9">
        <span>Created {formattedDate}</span>
        <a
          href={`https://app.prosperix.com/jobs/listing/any/${job.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-ppx-green-5 hover:underline"
        >
          View Details →
        </a>
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-ppx-green-2 text-ppx-green-5";
    case "closed":
      return "bg-ppx-neutral-4 text-ppx-neutral-10";
    case "draft":
      return "bg-ppx-yellow-2 text-ppx-yellow-5";
    default:
      return "bg-ppx-neutral-4 text-ppx-neutral-10";
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatJobsForCopy(jobs: JobsData["jobs"]): string {
  return jobs
    .map(
      (job) =>
        `${job.title} - ${job.status} - ${job.office_city}, ${job.office_country}`
    )
    .join("\n");
}


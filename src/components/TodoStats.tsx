interface TodoStatsProps {
  total: number
  completed: number
}

export function TodoStats({ total, completed }: TodoStatsProps) {
  return (
    <div className="text-center mb-6">
      <p className="text-gray-300">
        <span className="font-medium">Tasks: {total}</span>
        {total > 0 && (
          <>
            {' • '}
            <span className="font-medium">Completed: {completed} of {total}</span>
          </>
        )}
      </p>
    </div>
  )
}

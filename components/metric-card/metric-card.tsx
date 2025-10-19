'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
    value: string | number
    change?: {
        value: number
        period: string
        trend: 'up' | 'down' | 'neutral'
    }
    variant?: 'default' | 'compact' | 'detailed'
    status?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

const metricCardVariants = cva(
    'transition-all duration-200',
    {
        variants: {
            variant: {
                default: 'p-6',
                compact: 'p-4',
                detailed: 'p-6 space-y-4',
            },
            status: {
                success: 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50',
                warning: 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/50',
                error: 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50',
                info: 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50',
                neutral: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            status: 'neutral',
        },
    }
)

// Helper function to format numeric values with locale-aware formatting
const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
        return new Intl.NumberFormat().format(val)
    }
    return val
}

// Helper function to get appropriate trend icon
const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
        case 'up':
            return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
        case 'down':
            return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
        case 'neutral':
            return <Minus className="h-4 w-4 text-muted-foreground" />
    }
}

// Helper function to get trend-appropriate text colors
const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
        case 'up':
            return 'text-green-600 dark:text-green-400'
        case 'down':
            return 'text-red-600 dark:text-red-400'
        case 'neutral':
            return 'text-muted-foreground'
    }
}

function MetricCard({
    title,
    description,
    value,
    change,
    variant = 'default',
    status = 'neutral',
    className,
    ...props
}: MetricCardProps) {
    return (
        <Card
            {...props}
        >
            {/* Card Header with title and description */}
            <CardHeader className={cn(
                'flex flex-row items-center justify-between space-y-0',
                variant === 'compact' && 'pb-2'
            )}>
                <div className="space-y-1">
                    <CardTitle className={cn(
                        variant === 'compact' ? 'text-sm' : 'text-base'
                    )}>
                        {title}
                    </CardTitle>
                    {description && (
                        <CardDescription className={cn(
                            variant === 'compact' && 'text-xs'
                        )}>
                            {description}
                        </CardDescription>
                    )}
                </div>
            </CardHeader>

            {/* Card Content with value and trend indicator */}
            <CardContent className={cn(
                variant === 'compact' && 'pt-0'
            )}>
                <div className="flex items-baseline gap-2">
                    <div className={cn(
                        'font-bold',
                        variant === 'compact' ? 'text-xl' : 'text-2xl lg:text-3xl'
                    )}>
                        {formatValue(value)}
                    </div>

                    {change && (
                        <div className={cn(
                            'flex items-center gap-1 text-sm',
                            getTrendColor(change.trend)
                        )}>
                            {getTrendIcon(change.trend)}
                            <span className="font-medium">
                                {Math.abs(change.value)}%
                            </span>
                            <span className="text-muted-foreground">
                                {change.period}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

MetricCard.displayName = 'MetricCard'

export default MetricCard
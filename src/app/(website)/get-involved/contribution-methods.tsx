'use client';
import NumberFlow from '@number-flow/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Plan {
    id: string;
    name: string;
    price: {
        monthly: string | number;
        yearly: string | number;
    };
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
    icon?: ReactNode;
}

interface PricingPlansProps {
    title?: string;
    description?: string;
    className?: string;
    plans?: Plan[];
    onPlanSelect?: (plan: Plan, frequency: string) => void;
    showFrequencyToggle?: boolean;
}

const PricingPlans = ({
    title = "Simple, transparent pricing",
    description = "Managing a business is hard enough, so why not make your life easier? Our pricing plans are simple, transparent and scale with you.",
    className,
    plans = [],
    onPlanSelect,
    showFrequencyToggle = true
}: PricingPlansProps) => {

    const [frequency, setFrequency] = useState<string>('monthly');

    const handlePlanClick = (plan: Plan) => {
        if (onPlanSelect) {
            onPlanSelect(plan, frequency);
        }
    };

    return (
        <div className="not-prose flex flex-col gap-16 px-8 py-24 text-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">
                    {title}
                </h1>
                <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
                    {description}
                </p>
                {/* <Tabs defaultValue={frequency} onValueChange={setFrequency}>
                    <TabsList>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">
                            Yearly
                            <Badge variant="secondary">20% off</Badge>
                        </TabsTrigger>
                    </TabsList>
                </Tabs> */}
                <div className="mt-8 grid w-full max-w-6xl gap-4 lg:grid-cols-4">
                    {plans.map((plan) => (
                        <Card
                            className={cn(
                                'relative w-full text-left',
                                plan.popular && 'ring-2 ring-blue-700'
                            )}
                            key={plan.id}
                        >
                            {plan.popular && (
                                <Badge className="-translate-x-1/2 bg-blue-700 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
                                    Popular
                                </Badge>
                            )}
                            <CardHeader>
                                <CardTitle className="font-medium capitalize text-lg text-blue-700">
                                    {plan.name}
                                </CardTitle>
                                <CardDescription>
                                    <p>{plan.description}</p>
                                    {/* {typeof plan.price[frequency as keyof typeof plan.price] ===
                                        'number' ? (
                                        <NumberFlow
                                            className="font-medium text-foreground"
                                            format={{
                                                style: 'currency',
                                                currency: 'USD',
                                                maximumFractionDigits: 0,
                                            }}
                                            suffix={`/month, billed ${frequency}.`}
                                            value={
                                                plan.price[
                                                frequency as keyof typeof plan.price
                                                ] as number
                                            }
                                        />
                                    ) : (
                                        <span className="font-medium text-foreground">
                                            {plan.price[frequency as keyof typeof plan.price]}.
                                        </span>
                                    )} */}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                {plan.features.map((feature, index) => (
                                    <div
                                        className="flex items-center gap-2 font-semibold text-muted-foreground text-sm"
                                        key={index}
                                    >
                                        <BadgeCheck className="h-4 w-4" />
                                        {feature}
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onClick={() => handlePlanClick(plan)}
                                    variant={plan.popular ? 'default' : 'secondary'}
                                >
                                    {plan.cta}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PricingPlans;
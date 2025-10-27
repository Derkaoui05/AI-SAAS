// app/profile/page.tsx
'use client';

import { Spinner } from '@/components/ui/spinner';
import { API_ENDPOINTS } from '@/constants/mealplan';
import { availablePlans } from '@/lib/plans';
import type { MealPlanListResponse } from '@/types/mealplan';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Define proper types for API responses
interface ChangePlanResponse {
  success: boolean;
  message: string;
}

interface UnsubscribeResponse {
  success: boolean;
  message: string;
}

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  // State to manage selected priceId
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  // State for viewing historical meal plans
  const [selectedMealPlanId, setSelectedMealPlanId] = useState<string>('');

  // Fetch Subscription Details
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const res = await fetch('/api/profile/subscription-status');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch subscription.');
      }
      return res.json();
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  
  const {
    data: mealPlanList,
    isLoading: isPlansLoading,
    isError: isPlansError,
    error: plansError,
  } = useQuery({
    queryKey: ['mealplan-list'],
    queryFn: async () => {
      const res = await fetch(API_ENDPOINTS.LIST_MEALPLANS, { cache: 'no-store' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to list meal plans.');
      }
      return (await res.json()) as MealPlanListResponse;
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 60 * 1000,
  });

  // Adjusted Matching Logic Using priceId
  const currentPlan = availablePlans.find(
    (plan) => plan.interval === subscription?.subscription?.subscriptionTier,
  );

  // Mutation: Change Subscription Plan
  const changePlanMutation = useMutation<
    ChangePlanResponse,
    Error,
    string // The newPriceId
  >({
    mutationFn: async (newPlan: string) => {
      const res = await fetch('/api/profile/change-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPlan }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to change subscription plan.');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast.success('Subscription plan updated successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutation: Unsubscribe
  const unsubscribeMutation = useMutation<UnsubscribeResponse, Error, void>({
    mutationFn: async () => {
      const res = await fetch('/api/profile/unsubscribe', {
        method: 'POST',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to unsubscribe.');
      }
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      router.push('/subscribe');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handler for confirming plan change
  const handleConfirmChangePlan = () => {
    if (selectedPlan) {
      changePlanMutation.mutate(selectedPlan);
      setSelectedPlan('');
    }
  };

  // Handle Change Plan Selection with Confirmation
  const handleChangePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedPlan = e.target.value;
    if (newSelectedPlan) {
      setSelectedPlan(newSelectedPlan);
    }
  };

  // Handle Unsubscribe Button Click
  const handleUnsubscribe = () => {
    if (
      confirm('Are you sure you want to unsubscribe? You will lose access to premium features.')
    ) {
      unsubscribeMutation.mutate();
    }
  };

  // Loading or Not Signed In States
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <span className="ml-3 text-lg text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Authentication Required</h2>
          <p className="text-slate-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Main Profile Page UI
  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-3">Your Profile</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Manage your account settings and subscription details
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel: Profile Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sticky top-8">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    {user.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {user.firstName?.charAt(0) ||
                          user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase() ||
                          'U'}
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">
                      {user.fullName || 'User'}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-center space-x-2 text-slate-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        Member since{' '}
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Subscription Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Subscription Details</h2>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Spinner />
                    </div>
                    <span className="text-slate-600">Loading subscription details...</span>
                  </div>
                ) : isError ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Error Loading Subscription
                    </h3>
                    <p className="text-red-600">{error?.message}</p>
                  </div>
                ) : subscription ? (
                  <div className="space-y-6">
                    {/* Current Subscription Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800">Current Plan</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ACTIVE
                        </span>
                      </div>

                      {currentPlan ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Plan Name</p>
                                <p className="font-semibold text-slate-800">{currentPlan.name}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-green-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Amount</p>
                                <p className="font-semibold text-slate-800">
                                  {currentPlan.amount} {currentPlan.currency}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-purple-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Billing Cycle</p>
                                <p className="font-semibold text-slate-800 capitalize">
                                  {currentPlan.interval}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-5 h-5 text-orange-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500">Status</p>
                                <p className="font-semibold text-green-600">Active</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-red-500">Current plan not found.</p>
                        </div>
                      )}
                    </div>

                    {/* Change Subscription Plan */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">
                        Change Subscription Plan
                      </h3>
                      <div className="space-y-4">
                        <select
                          onChange={handleChangePlan}
                          defaultValue={currentPlan?.interval}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          disabled={changePlanMutation.isPending}
                        >
                          <option value="" disabled>
                            Select a new plan
                          </option>
                          {availablePlans.map((plan, key) => (
                            <option key={key} value={plan.interval}>
                              {plan.name} - ${plan.amount} / {plan.interval}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={handleConfirmChangePlan}
                          disabled={!selectedPlan || changePlanMutation.isPending}
                          className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
                            !selectedPlan || changePlanMutation.isPending
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {changePlanMutation.isPending ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Spinner />
                              <span>Updating plan...</span>
                            </div>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Your Meal Plans */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Your Meal Plans</h3>

                      {isPlansLoading ? (
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Spinner />
                          <span>Loading meal plans…</span>
                        </div>
                      ) : isPlansError ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                          {(plansError as Error)?.message || 'Failed to load meal plans.'}
                        </div>
                      ) : mealPlanList && mealPlanList.items.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <select
                              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={selectedMealPlanId}
                              onChange={(e) => setSelectedMealPlanId(e.target.value)}
                            >
                              <option value="">
                                Select a plan ({mealPlanList.items.length} total)
                              </option>
                              {mealPlanList.items.map((item, idx) => (
                                <option key={item.id} value={item.id}>
                                  {`#${mealPlanList.items.length - idx} — ${new Date(
                                    item.createdAt,
                                  ).toLocaleString()}`}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
                            {mealPlanList.items.map((item, idx) => (
                              <div key={item.id} className="p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-slate-500">Generated</p>
                                    <p className="font-medium text-slate-800">
                                      {`#${mealPlanList.items.length - idx} — ${new Date(
                                        item.createdAt,
                                      ).toLocaleString()}`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={`/mealplan/${item.id}`}
                                      className="px-3 py-2 rounded-md text-sm font-medium border bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                                    >
                                      View details
                                    </a>
                                    <button
                                      onClick={async () => {
                                        if (
                                          !confirm('Delete this meal plan? This cannot be undone.')
                                        )
                                          return;
                                        try {
                                          const res = await fetch(`/api/mealplan/${item.id}`, {
                                            method: 'DELETE',
                                          });
                                          if (!res.ok) {
                                            const j = await res.json();
                                            throw new Error(j.error || 'Failed to delete plan');
                                          }
                                          window.location.reload();
                                        } catch (e) {
                                          alert((e as Error).message);
                                        }
                                      }}
                                      className="px-3 py-2 rounded-md text-sm font-medium border cursor-pointer bg-white text-red-600 border-red-600 hover:bg-red-50"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-600">You have not generated any meal plans yet.</p>
                      )}
                    </div>

                    {/* Unsubscribe */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Unsubscribe</h3>
                      <p className="text-slate-600 mb-4">
                        Cancel your subscription to stop billing. You&apos;ll continue to have
                        access until the end of your current billing period.
                      </p>
                      <button
                        onClick={handleUnsubscribe}
                        disabled={unsubscribeMutation.isPending}
                        className={`w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ${
                          unsubscribeMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {unsubscribeMutation.isPending ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Spinner />
                            <span>Unsubscribing...</span>
                          </div>
                        ) : (
                          'Unsubscribe'
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      No Subscription Data
                    </h3>
                    <p className="text-slate-600">You are not subscribed to any plan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

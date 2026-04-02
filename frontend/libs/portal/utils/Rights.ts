// SPDX-FileCopyrightText: 2025 Mercedes-Benz Group AG and Mercedes-Benz AG
//
// SPDX-License-Identifier: Apache-2.0

import {Group} from '@disclosure-portal/model/Rights';
import {useUserStore} from '@disclosure-portal/stores/user';
import {useRouter} from 'vue-router';

type AccessChecker = () => boolean;

export function rights() {
  const userStore = useUserStore();
  return userStore.getRights;
}

export function redirectNonAdmins() {
  if (!isAnyOfAdmin()) {
    const router = useRouter();
    router.replace({path: '/dashboard/home'}).finally();
  }
}

export function redirectRestrictedAccess(accessChecker: AccessChecker) {
  if (!accessChecker()) {
    const router = useRouter();
    router.replace({path: '/dashboard/home'}).finally();
  }
}

export function redirectDisabledUser() {
  const router = useRouter();
  router.replace({path: '/dashboard'}).finally();
}

export function hasLicenseAccess(): boolean {
  const r = rights();
  return r.allowLicense && (r.allowLicense.create || r.allowLicense.update || r.allowLicense.delete);
}

export function hasClassificationsAccess(): boolean {
  const r = rights();
  return (
    r.allowObligation &&
    (r.allowObligation.create || r.allowObligation.update || r.allowObligation.delete)
  );
}

export function hasPolicyAccess(): boolean {
  const r = rights();
  return r.allowPolicy && (r.allowPolicy.create || r.allowPolicy.update || r.allowPolicy.delete);
}

export function hasAllProjectsReadonly(): boolean {
  const r = rights();
  return r.allowProject && r.allowProject.read;
}

export function hasLabelAccess(): boolean {
  const r = rights();
  return r.allowLabel && (r.allowLabel.create || r.allowLabel.update || r.allowLabel.delete);
}

export function hasSchemaAccess(): boolean {
  const r = rights();
  return r.allowSchema && (r.allowSchema.create || r.allowSchema.update || r.allowSchema.delete);
}

export function hasToolsAccess(): boolean {
  const r = rights();
  return r.allowTools && (r.allowTools.create || r.allowTools.update || r.allowTools.delete);
}

export function hasSampleDataAccess(): boolean {
  const r = rights();
  return (
    r.allowSampleData &&
    (r.allowSampleData.create || r.allowSampleData.update || r.allowSampleData.delete)
  );
}

export function hasStyleguideAccess(): boolean {
  const r = rights();
  return (
    r.allowStyleguide &&
    (r.allowStyleguide.create || r.allowStyleguide.update || r.allowStyleguide.delete)
  );
}

export function hasUsersAccess(): boolean {
  const r = rights();
  return (
    r.allowUsers &&
    r.allowUsers.create &&
    r.allowUsers.read &&
    r.allowUsers.update &&
    r.allowUsers.delete
  );
}

export function hasReviewTemplatesAccess(): boolean {
  const r = rights();
  return r.hasReviewTemplatesAcces();
}

export function isAnyOfAdmin(): boolean {
  return (
    hasClassificationsAccess() ||
    hasPolicyAccess() ||
    hasAllProjectsReadonly() ||
    hasLabelAccess() ||
    hasSchemaAccess() ||
    hasToolsAccess() ||
    hasSampleDataAccess() ||
    hasStyleguideAccess() ||
    hasUsersAccess()
  );
}

export function hasRole(group: Group): boolean {
  const r = rights();
  return r.groups.includes(group);
}

export function isLicenseManager(): boolean {
  return hasRole(Group.UserLicenseManager);
}

export function isPolicyManager(): boolean {
  return hasRole(Group.UserPolicyManager);
}

export function isProjectAnalyst(): boolean {
  return hasRole(Group.UserProjectAnalyst);
}

export function isDomainAdmin(): boolean {
  return hasRole(Group.UserDomainAdmin);
}

export function isApplicationAdmin(): boolean {
  return hasRole(Group.UserApplicationAdmin);
}

export function isInternalUser(): boolean {
  return hasRole(Group.UserInternal);
}

export function isNonInternalUser(): boolean {
  return hasRole(Group.UserNonInternal);
}

export function isFOSSOffice(): boolean {
  return hasRole(Group.UserFOSSOffice);
}

export const RightsUtils = {
  rights,
  redirectNonAdmins,
  redirectRestrictedAccess,
  redirectDisabledUser,
  hasLicenseAccess,
  hasClassificationsAccess,
  hasPolicyAccess,
  hasAllProjectsReadonly,
  hasLabelAccess,
  hasSchemaAccess,
  hasToolsAccess,
  hasSampleDataAccess,
  hasStyleguideAccess,
  hasUsersAccess,
  hasReviewTemplatesAccess,
  isAnyOfAdmin,
  hasRole,
  isLicenseManager,
  isPolicyManager,
  isProjectAnalyst,
  isDomainAdmin,
  isApplicationAdmin,
  isInternalUser,
  isNonInternalUser,
  isFOSSOffice,
};

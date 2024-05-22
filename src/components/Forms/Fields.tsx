import { useTranslation } from "react-i18next";
import { tonInputStep } from "../../constants";
import { addressValidator, websiteValidator } from "./Validators";

export function getWithdrawFields(initial: number, max: number) {
  return [
    {
      name: "amount",

      i18nKey: "withdraw.field.amount",
      type: "number",
      initialValue: Number(initial),
      max: Number(max),
      min: 0,
      step: tonInputStep,
      isRequired: true,
    },
  ];
}

export function getEditOrganizationFields(metadata: any) {
  return [
    {
      name: "name",
      type: "text",
      i18nKey: "organization.form.field.name",
      required: true,
      initialValue: metadata.name,
    },
    {
      name: "description",
      type: "textarea",
      i18nKey: "organization.form.field.description",
      required: true,
      initialValue: metadata.description,
    },
    {
      name: "emoji",
      type: "emoji",
      i18nKey: "organization.form.field.emoji",
      required: true,
      initialValue: metadata.emoji,
    },
    {
      name: "website",
      type: "text",
      i18nKey: "organization.form.field.website",
      required: false,
      initialValue: metadata.website,
      validators: [websiteValidator],
    },
  ];
}

export function getTransferOwnershipFields() {
  return [
    {
      name: "newOwner",
      i18nKey: "ownership.new",
      type: "text",
      initialValue: "",
      isRequired: true,
      validators: [addressValidator],
    },
  ];
}

export function getNewOrganizationFields() {
  return [
    {
      name: "name",
      i18nKey: "organization.form.field.name",
      type: "text",
      initialValue: "",
      isRequired: true,
    },
    {
      name: "description",
      i18nKey: "organization.form.field.description",
      type: "textarea",
      initialValue: "",
      isRequired: true,
    },
    {
      name: "emoji",
      i18nKey: "organization.form.field.emoji",
      type: "emoji",
      initialValue: "",
      isRequired: true,
    },
    {
      name: "website",
      i18nKey: "organization.form.field.website",
      type: "text",
      initialValue: "",
      isRequired: false,
      validators: [websiteValidator],
    },
  ];
}

export const newVotingFields = [
  {
    name: "name",
    i18nKey: "voting.form.field.name",
    type: "text",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "description",
    i18nKey: "voting.form.field.description",
    type: "textarea",
    initialValue: "",
    isRequired: true,
  },
  {
    name: "emoji",
    i18nKey: "voting.form.field.emoji",
    type: "emoji",
    isRequired: true,
  },
  {
    name: "website",
    i18nKey: "voting.form.field.website",
    type: "text",
    initialValue: "",
    isRequired: false,
  },
  {
    name: "voteFee",
    i18nKey: "voting.form.field.fee",
    type: "number",
    initialValue: "0",
    min: 0,
    step: tonInputStep,
    isRequired: true,
  },
  {
    name: "votesPerCandidate",
    i18nKey: "voting.form.field.votesPerCandidate",
    type: "number",
    initialValue: 1,
    min: 1,
    isRequired: true,
  },
  {
    name: "startTime",
    i18nKey: "voting.form.field.startTime",
    type: "datepicker",
    initialValue: new Date(),
    isRequired: true,
  },
  {
    name: "endTime",
    i18nKey: "voting.form.field.endTime",
    type: "datepicker",
    initialValue: new Date(new Date().getTime() + 24 * 3600 * 1000),
    isRequired: true,
  },
  {
    name: "candidates",
    i18nKey: "voting.form.field.candidates",
    type: "reccuring",
    initialValue: [],
    isRequired: true,
    fields: [
      {
        name: "name",
        i18nKey: "voting.form.field.name",
        type: "text",
        initialValue: "",
      },
      {
        name: "info",
        i18nKey: "voting.form.field.about",
        type: "text",
        initialValue: "",
      },
    ],
  },
] as any;

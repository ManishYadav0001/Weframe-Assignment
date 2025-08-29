// app/ui/documents-table.tsx
'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  FileType,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
} from 'lucide-react';

export type Stage = 'Full' | 'Onboarding' | 'Franchisee' | 'Prospect';

export interface DocumentRow {
  id: string;
  name: string;
  size: string;
  ext: 'pdf' | 'doc' | 'jpg' | 'mp4' | 'mp3' | 'aep';
  docType: string; // e.g., Legal, Financial, Technology, Vendors & Assets
  aiApp: boolean;
  dashboard: boolean;
  stage: Stage;
}

export interface DocumentsTableProps {
  rows: DocumentRow[];
  onToggleAI?: (id: string, checked: boolean) => void;
  onToggleDashboard?: (id: string, checked: boolean) => void;
  onStageChange?: (id: string, stage: Stage) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

function FileIcon({ ext }: { ext: DocumentRow['ext'] }) {
  const base =
    'relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-white ring-1 ring-gray-200 shadow-sm';
  const label =
    'absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-semibold ring-1 shadow-sm';

  switch (ext) {
    case 'pdf':
      return (
        <span className={base}>
          <FileText className="size-5 text-rose-500" />
          <span className={`${label} bg-rose-50 text-rose-600 ring-rose-200`}>PDF</span>
        </span>
      );
    case 'doc':
      return (
        <span className={base}>
          <FileType className="size-5 text-blue-600" />
          <span className={`${label} bg-blue-50 text-blue-600 ring-blue-200`}>DOC</span>
        </span>
      );
    case 'jpg':
      return (
        <span className={base}>
          <FileImage className="size-5 text-emerald-600" />
          <span className={`${label} bg-emerald-50 text-emerald-700 ring-emerald-200`}>IMG</span>
        </span>
      );
    case 'mp4':
      return (
        <span className={base}>
          <FileVideo className="size-5 text-amber-600" />
          <span className={`${label} bg-amber-50 text-amber-700 ring-amber-200`}>MP4</span>
        </span>
      );
    case 'mp3':
      return (
        <span className={base}>
          <FileAudio className="size-5 text-fuchsia-600" />
          <span className={`${label} bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200`}>MP3</span>
        </span>
      );
    case 'aep':
    default:
      return (
        <span className={base}>
          <FileArchive className="size-5 text-gray-700" />
          <span className={`${label} bg-gray-50 text-gray-700 ring-gray-200`}>AEP</span>
        </span>
      );
  }
}

function DocTypeBadge({ label }: { label: string }) {
  const palette: Record<string, string> = {
    Legal: 'bg-sky-50 text-sky-700 ring-sky-200',
    Financial: 'bg-pink-50 text-pink-700 ring-pink-200',
    Technology: 'bg-orange-50 text-orange-700 ring-orange-200',
    'Vendors & Assets': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  };
  const cls = palette[label] ?? 'bg-gray-50 text-gray-700 ring-gray-200';
  return (
    <Badge
      variant="secondary"
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${cls} border-0`}
    >
      {label}
    </Badge>
  );
}

export function DocumentsTable({
  rows,
  onToggleAI,
  onToggleDashboard,
  onStageChange,
  onDelete,
  onEdit,
}: DocumentsTableProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const allSelected = selected.size === rows.length && rows.length > 0;
  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(rows.map((r) => r.id)) : new Set());
  };
  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-white">
          <TableRow className="[&>th]:h-12">
            <TableHead className="w-[36px]">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(v) => toggleAll(Boolean(v))}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="min-w-[300px]">Document Name</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead className="text-center">AI App Inclusion</TableHead>
            <TableHead className="text-center">Dashboard Inclusion</TableHead>
            <TableHead>Stage Access</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className="align-middle">
              <TableCell className="w-[36px]">
                <Checkbox
                  checked={selected.has(row.id)}
                  onCheckedChange={(v) => toggleOne(row.id, Boolean(v))}
                  aria-label={`Select ${row.name}`}
                />
              </TableCell>

              <TableCell>
                <div className="flex items-start gap-3">
                  <FileIcon ext={row.ext} />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.name}</span>
                    <span className="text-xs text-gray-500">{row.size}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <DocTypeBadge label={row.docType} />
              </TableCell>

              <TableCell className="text-center">
                <Switch
                  checked={row.aiApp}
                  onCheckedChange={(v) => onToggleAI?.(row.id, Boolean(v))}
                  className="data-[state=checked]:bg-sky-500"
                />
              </TableCell>

              <TableCell className="text-center">
                <Switch
                  checked={row.dashboard}
                  onCheckedChange={(v) => onToggleDashboard?.(row.id, Boolean(v))}
                  className="data-[state=checked]:bg-sky-500"
                />
              </TableCell>

              <TableCell>
                <Select
                  defaultValue={row.stage}
                  onValueChange={(v) => onStageChange?.(row.id, v as Stage)}
                >
                  <SelectTrigger className="h-9 w-[160px] rounded-lg border-gray-200 bg-white shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="start" className="w-[160px]">
                    <SelectItem value="Full">Full</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Franchisee">Franchisee</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="link"
                    className="h-8 px-0 text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => onDelete?.(row.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="link"
                    className="h-8 px-0 text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => onEdit?.(row.id)}
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DocumentsTable;

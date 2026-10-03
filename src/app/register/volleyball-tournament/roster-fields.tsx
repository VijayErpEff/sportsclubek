"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export interface PlayerInput {
  name: string;
  age: string; // string for input binding; converted on submit
  email: string;
  phone: string;
  isCaptain?: boolean;
}

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 8;

/**
 * How many are on the team as the app counts it: every listed player plus the captain, unless the
 * captain is on the list already. The app's team size (4–8) includes the captain.
 */
export function teamTotal(players: PlayerInput[]): number {
  return players.length + (players.some((p) => p.isCaptain) ? 0 : 1);
}
export const MIN_AGE = 16;

export function emptyPlayer(): PlayerInput {
  return { name: "", age: "", email: "", phone: "" };
}

interface RosterFieldsProps {
  players: PlayerInput[];
  errors: Record<string, string>;
  onChange: (players: PlayerInput[]) => void;
}

export function RosterFields({ players, errors, onChange }: RosterFieldsProps) {
  const updatePlayer = (idx: number, patch: Partial<PlayerInput>) => {
    // One captain: ticking "that's me" on a row clears it on every other row.
    const next = players.map((p, i) =>
      i === idx ? { ...p, ...patch } : patch.isCaptain === true ? { ...p, isCaptain: false } : p
    );
    onChange(next);
  };

  const addPlayer = () => {
    if (teamTotal(players) >= MAX_PLAYERS) return;
    onChange([...players, emptyPlayer()]);
  };

  const removePlayer = (idx: number) => {
    if (players.length <= MIN_PLAYERS) return;
    onChange(players.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs sm:text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">{teamTotal(players)}</span>
          <span className="text-neutral-400"> / {MAX_PLAYERS} incl. captain</span>
          {" — "}
          {players.length < MIN_PLAYERS ? (
            <span className="text-error">need {MIN_PLAYERS}+</span>
          ) : teamTotal(players) > MAX_PLAYERS ? (
            <span className="text-error">one too many</span>
          ) : (
            <span className="text-secondary">looks good</span>
          )}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addPlayer}
          disabled={teamTotal(players) >= MAX_PLAYERS}
        >
          <Plus className="h-4 w-4" /> Add player
        </Button>
      </div>

      {errors.players && (
        <p className="text-sm text-error" role="alert">
          {errors.players}
        </p>
      )}

      <ol className="space-y-2">
        {players.map((p, idx) => (
          <PlayerRow
            key={idx}
            idx={idx}
            player={p}
            errors={errors}
            canRemove={players.length > MIN_PLAYERS}
            onUpdate={(patch) => updatePlayer(idx, patch)}
            onRemove={() => removePlayer(idx)}
          />
        ))}
      </ol>
    </div>
  );
}

function PlayerRow({
  idx,
  player,
  errors,
  canRemove,
  onUpdate,
  onRemove,
}: {
  idx: number;
  player: PlayerInput;
  errors: Record<string, string>;
  canRemove: boolean;
  onUpdate: (patch: Partial<PlayerInput>) => void;
  onRemove: () => void;
}) {
  const [contactOpen, setContactOpen] = useState(
    () => !!(player.email || player.phone)
  );
  const hasFieldError =
    errors[`players.${idx}.name`] ||
    errors[`players.${idx}.age`] ||
    errors[`players.${idx}.email`] ||
    errors[`players.${idx}.phone`];

  return (
    <li
      className={cn(
        "bg-neutral-50 border rounded-lg p-3",
        hasFieldError ? "border-error/30" : "border-neutral-200"
      )}
    >
      {/* Main row — number + name + age + remove */}
      <div className="flex items-start gap-2">
        <span
          aria-hidden="true"
          className="shrink-0 inline-flex items-center justify-center w-7 h-10 sm:h-11 rounded-md bg-white border border-neutral-200 text-xs font-bold text-neutral-500 font-mono"
        >
          {idx + 1}
        </span>
        <div className="grid grid-cols-[1fr_72px] sm:grid-cols-[1fr_88px] gap-2 flex-1 min-w-0">
          <FloatingInput
            label="Player name"
            name={`players.${idx}.name`}
            required
            autoComplete="off"
            value={player.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            error={errors[`players.${idx}.name`]}
          />
          <FloatingInput
            label="Age"
            name={`players.${idx}.age`}
            type="number"
            inputMode="numeric"
            min={MIN_AGE}
            max={99}
            required
            value={player.age}
            onChange={(e) => onUpdate({ age: e.target.value })}
            error={errors[`players.${idx}.age`]}
          />
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onRemove}
          disabled={!canRemove}
          className="text-neutral-400 hover:text-error h-10 sm:h-11 px-2"
          aria-label={`Remove player ${idx + 1}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* The captain on their own roster: the app counts them once, as the captain row */}
      <label className="mt-2 ml-9 flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
        <input
          type="checkbox"
          name={`players.${idx}.isCaptain`}
          checked={player.isCaptain === true}
          onChange={(e) => onUpdate({ isCaptain: e.target.checked })}
          className="rounded border-neutral-300 text-accent focus:ring-accent/30"
        />
        This is me, the captain
      </label>
      {/* Contact toggle + collapsible email/phone */}
      <div className="mt-2 ml-9">
        <button
          type="button"
          onClick={() => setContactOpen((v) => !v)}
          className="text-xs text-neutral-500 hover:text-accent inline-flex items-center gap-1 transition-colors"
          aria-expanded={contactOpen}
        >
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              contactOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
          {contactOpen ? "Hide contact" : "Add contact (optional)"}
        </button>
        {contactOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <FloatingInput
              label="Email (optional)"
              name={`players.${idx}.email`}
              type="email"
              autoComplete="off"
              value={player.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              error={errors[`players.${idx}.email`]}
            />
            <FloatingInput
              label="Phone (optional)"
              name={`players.${idx}.phone`}
              type="tel"
              autoComplete="off"
              value={player.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              error={errors[`players.${idx}.phone`]}
            />
          </div>
        )}
      </div>
    </li>
  );
}

export function playerInputsToApi(players: PlayerInput[]) {
  return players.map((p) => ({
    name: p.name.trim(),
    age: p.age.trim() ? Number(p.age) : undefined,
    email: p.email.trim() || undefined,
    phone: p.phone.trim() || undefined,
    isCaptain: p.isCaptain || undefined,
  }));
}

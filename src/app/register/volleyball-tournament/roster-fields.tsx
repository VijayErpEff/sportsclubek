"use client";

import { Plus, Trash2, User } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";

export interface PlayerInput {
  name: string;
  age: string; // string for input binding; converted on submit
  email: string;
  phone: string;
  isCaptain?: boolean;
}

export const MIN_PLAYERS = 6;
export const MAX_PLAYERS = 10;

export function emptyPlayer(): PlayerInput {
  return { name: "", age: "", email: "", phone: "" };
}

interface RosterFieldsProps {
  division: "youth" | "adult";
  players: PlayerInput[];
  errors: Record<string, string>;
  onChange: (players: PlayerInput[]) => void;
}

export function RosterFields({ division, players, errors, onChange }: RosterFieldsProps) {
  const updatePlayer = (idx: number, patch: Partial<PlayerInput>) => {
    const next = players.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange(next);
  };

  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return;
    onChange([...players, emptyPlayer()]);
  };

  const removePlayer = (idx: number) => {
    if (players.length <= MIN_PLAYERS) return;
    onChange(players.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">{players.length}</span> of {MAX_PLAYERS} players
          {" — "}
          {players.length < MIN_PLAYERS ? (
            <span className="text-error">need at least {MIN_PLAYERS}</span>
          ) : (
            <span className="text-secondary">roster size OK</span>
          )}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addPlayer}
          disabled={players.length >= MAX_PLAYERS}
        >
          <Plus className="h-4 w-4" /> Add player
        </Button>
      </div>

      {errors.players && (
        <p className="text-sm text-error" role="alert">
          {errors.players}
        </p>
      )}

      <ol className="space-y-4">
        {players.map((p, idx) => {
          const labelPrefix = `Player ${idx + 1}`;
          return (
            <li
              key={idx}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  {labelPrefix}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removePlayer(idx)}
                  disabled={players.length <= MIN_PLAYERS}
                  className="text-neutral-500 hover:text-error"
                  aria-label={`Remove ${labelPrefix}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <FloatingInput
                  label="Full name"
                  name={`players.${idx}.name`}
                  required
                  autoComplete="off"
                  value={p.name}
                  onChange={(e) => updatePlayer(idx, { name: e.target.value })}
                  error={errors[`players.${idx}.name`]}
                />
                <FloatingInput
                  label={division === "youth" ? "Age (12–17)" : "Age (optional)"}
                  name={`players.${idx}.age`}
                  type="number"
                  inputMode="numeric"
                  min={division === "youth" ? 12 : 0}
                  max={division === "youth" ? 17 : 99}
                  required={division === "youth"}
                  value={p.age}
                  onChange={(e) => updatePlayer(idx, { age: e.target.value })}
                  error={errors[`players.${idx}.age`]}
                />
                <FloatingInput
                  label="Email (optional)"
                  name={`players.${idx}.email`}
                  type="email"
                  autoComplete="off"
                  value={p.email}
                  onChange={(e) => updatePlayer(idx, { email: e.target.value })}
                  error={errors[`players.${idx}.email`]}
                />
                <FloatingInput
                  label="Phone (optional)"
                  name={`players.${idx}.phone`}
                  type="tel"
                  autoComplete="off"
                  value={p.phone}
                  onChange={(e) => updatePlayer(idx, { phone: e.target.value })}
                  error={errors[`players.${idx}.phone`]}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
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

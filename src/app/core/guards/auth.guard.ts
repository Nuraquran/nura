// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const session = await supabase.getSession();

  if (session) {
    return true;
  }

  router.navigateByUrl('/login', { replaceUrl: true });
  return false;
};

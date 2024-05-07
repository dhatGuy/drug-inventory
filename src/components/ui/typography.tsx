import * as React from "react";
import { Platform, Text as RNText } from "react-native";

import * as Slot from "~/components/primitives/slot";
import { SlottableTextProps, TextRef } from "~/components/primitives/types";
import { cn } from "~/lib/utils";

const H1 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="1"
        className={cn(
          `web:scroll-m-20 text-4xl text-foreground font-PoppinsExtraBold tracking-tight lg:text-5xl
          web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H1.displayName = "H1";

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="2"
        className={cn(
          `web:scroll-m-20 pb-2 text-3xl text-foreground font-PoppinsSemiBold tracking-tight
          first:mt-0 web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H2.displayName = "H2";

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="3"
        className={cn(
          `web:scroll-m-20 text-2xl text-foreground font-PoppinsSemiBold tracking-tight
          web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H3.displayName = "H3";

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role="heading"
        aria-level="4"
        className={cn(
          `web:scroll-m-20 text-xl text-foreground font-PoppinsSemiBold tracking-tight
          web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

H4.displayName = "H4";

const P = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn("text-base text-foreground font-PoppinsMedium web:select-text", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
P.displayName = "P";

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        // @ts-ignore - role of blockquote renders blockquote element on the web
        role={Platform.OS === "web" ? "blockquote" : undefined}
        className={cn(
          `mt-6 native:mt-4 border-l-2 border-border pl-6 native:pl-3 text-base text-foreground
          font-PoppinsMedium italic web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

BlockQuote.displayName = "BlockQuote";

const Code = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        // @ts-ignore - role of code renders code element on the web
        role={Platform.OS === "web" ? "code" : undefined}
        className={cn(
          `relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm text-foreground
          font-PoppinsSemiBold web:select-text`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Code.displayName = "Code";

const Lead = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "text-xl font-PoppinsSemiBold text-muted-foreground web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Lead.displayName = "Lead";

const Large = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn("text-xl text-foreground font-PoppinsSemiBold web:select-text", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Large.displayName = "Large";

const Small = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "text-sm text-foreground font-PoppinsMedium leading-none web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Small.displayName = "Small";

const Muted = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(
          "text-sm text-muted-foreground font-PoppinsRegular web:select-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Muted.displayName = "Muted";

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };

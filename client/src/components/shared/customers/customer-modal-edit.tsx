"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/lib/types/customers";
import { toast } from "sonner";

interface EditCustomerModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onCustomerUpdated: () => void;
}

export default function EditCustomerModal({
  isOpen,
  customer,
  onClose,
  onCustomerUpdated,
}: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellphone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        cellphone: customer.cellphone || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        cellphone: "",
      });
    }
  }, [customer]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    const limited = numbers.slice(0, 11);
    
    if (limited.length <= 2) {
      return `(${limited}`;
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange("cellphone", formatted);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Nome é obrigatório");
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error("Email é obrigatório");
      return false;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email inválido");
      return false;
    }
    
    if (!formData.cellphone.trim()) {
      toast.error("Telefone é obrigatório");
      return false;
    }
    
    // Remove formatação para validar
    const phoneNumbers = formData.cellphone.replace(/\D/g, "");
    if (phoneNumbers.length < 10) {
      toast.error("Telefone deve ter pelo menos 10 dígitos");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer || !validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar cliente");
      }

      toast.success("Cliente atualizado com sucesso!");
      onCustomerUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar cliente");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Editar Cliente
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
              Nome completo *
            </Label>
            <Input
              id="edit-name"
              type="text"
              placeholder="Digite o nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email" className="text-sm font-medium text-gray-700">
              Email *
            </Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-cellphone" className="text-sm font-medium text-gray-700">
              Telefone *
            </Label>
            <Input
              id="edit-cellphone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.cellphone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
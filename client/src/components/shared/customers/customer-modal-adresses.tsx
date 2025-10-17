"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { useLoading } from "@/providers/LoadingProvider";

interface CreateAddressModalProps {
  isOpen: boolean;
  customerId: number | null;
  customerName: string;
  onClose: () => void;
  onAddressCreated: () => void;
}

export default function CreateAddressModal({
  isOpen,
  customerId,
  customerName,
  onClose,
  onAddressCreated,
}: CreateAddressModalProps) {
  const [formData, setFormData] = useState({
    postal_code: "",
    street: "",
    neighborhood: "",
    number: "",
    complement: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setLoading } = useLoading();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    const limited = numbers.slice(0, 8);
    
    if (limited.length <= 5) {
      return limited;
    } else {
      return `${limited.slice(0, 5)}-${limited.slice(5)}`;
    }
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCep(value);
    handleInputChange("postal_code", formatted);
  };

  const fetchAddressByCep = async (cep: string) => {
    const cepNumbers = cep.replace(/\D/g, "");

    if (cepNumbers.length !== 8) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
      }

      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        complement: data.complemento || prev.complement,
      }));

      toast.success("Endereço carregado com sucesso!");
    } catch (error) {
      console.error("Error fetching CEP:", error);
      toast.error("Erro ao buscar CEP. Verifique o número digitado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cepNumbers = formData.postal_code.replace(/\D/g, "");

    if (cepNumbers.length === 8) {
      fetchAddressByCep(formData.postal_code);
    }
  }, [formData.postal_code]);

  const validateForm = () => {
    if (!formData.postal_code.trim()) {
      toast.error("CEP é obrigatório");
      return false;
    }
    
    const cepNumbers = formData.postal_code.replace(/\D/g, "");
    if (cepNumbers.length !== 8) {
      toast.error("CEP deve ter 8 dígitos");
      return false;
    }
    
    if (!formData.street.trim()) {
      toast.error("Rua é obrigatória");
      return false;
    }
    
    if (!formData.neighborhood.trim()) {
      toast.error("Bairro é obrigatório");
      return false;
    }
    
    if (!formData.number.trim()) {
      toast.error("Número é obrigatório");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerId || !validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/customers/${customerId}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar endereço");
      }

      toast.success("Endereço criado com sucesso!");
      
      setFormData({
        postal_code: "",
        street: "",
        neighborhood: "",
        number: "",
        complement: "",
      });
      
      onAddressCreated();
      onClose();
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar endereço");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        postal_code: "",
        street: "",
        neighborhood: "",
        number: "",
        complement: "",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-600" />
            Novo Endereço
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Adicionar endereço para {customerName}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="postal_code" className="text-sm font-medium text-gray-700">
              CEP *
            </Label>
            <Input
              id="postal_code"
              type="text"
              value={formData.postal_code}
              onChange={(e) => handleCepChange(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-sm font-medium text-gray-700">
              Rua *
            </Label>
            <Input
              id="street"
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700">
                Bairro *
              </Label>
              <Input
                id="neighborhood"
                type="text"
                value={formData.neighborhood}
                onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number" className="text-sm font-medium text-gray-700">
                Número *
              </Label>
              <Input
                  id="number"
                  type="text"
                  value={formData.number}
                  onChange={(e) => handleInputChange("number", e.target.value)}
                  disabled={isLoading}
                  className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complement" className="text-sm font-medium text-gray-700">
              Complemento
            </Label>
            <Input
              id="complement"
              type="text"
              value={formData.complement}
              onChange={(e) => handleInputChange("complement", e.target.value)}
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
              {isLoading ? "Criando..." : "Criar Endereço"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
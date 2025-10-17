"use client";

import {useState, useMemo, Fragment} from "react";
import { Customer } from "@/lib/types/customers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toast } from "sonner";
import EditCustomerModal from "@/components/shared/customers/customer-modal-edit";
import CreateAddressModal from "@/components/shared/customers/customer-modal-adresses";
import EditAddressModal from "@/components/shared/customers/customer-modal-adresses-edit";
import { CustomerAddress } from "@/lib/types/customers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomersTableProps {
  customers: Customer[];
  searchTerm: string;
  onCustomerUpdated: () => void;
}

export default function CustomersTable({
  customers,
  searchTerm,
  onCustomerUpdated,
}: CustomersTableProps) {
  const [deletingCustomer, setDeletingCustomer] = useState<number | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedCustomerForAddress, setSelectedCustomerForAddress] = useState<Customer | null>(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);

  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState<{ isOpen: boolean; customerId: number | null }>({ isOpen: false, customerId: null });
  const [deleteAddressDialog, setDeleteAddressDialog] = useState<{ isOpen: boolean; addressId: number | null; customerId: number | null }>({ isOpen: false, addressId: null, customerId: null });

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.cellphone.includes(searchTerm);
    });
  }, [customers, searchTerm]);

  const getCustomerInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-destructive",
      "bg-primary",
      "bg-chart-1",
      "bg-chart-2",
      "bg-chart-3",
      "bg-chart-4",
      "bg-chart-5",
      "bg-accent",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getPrimaryAddress = (customer: Customer) => {
    if (customer.addresses && customer.addresses.length > 0) {
      const address = customer.addresses[0];
      if (address.neighborhood && address.street) {
        return `${address.neighborhood}, ${address.street}`;
      }

      if (address.street) {
        return address.street;
      }

      if (address.neighborhood) {
        return address.neighborhood;
      }
    }

    return "Endereço não cadastrado";
  };

  const getPrimaryCep = (customer: Customer) => {
    if (customer.addresses && customer.addresses.length > 0) {
      const address = customer.addresses[0];
      if (address.postal_code) {
        return address.postal_code;
      }
    }

    return "Não cadastrado";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const formatCep = (cep: string) => {
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return cep;
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleToggleAddresses = (customerId: number) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  const handleAddAddress = (customer: Customer) => {
    setSelectedCustomerForAddress(customer);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setSelectedCustomerForAddress(null);
  };

  const handleEditAddress = (address: CustomerAddress, customer: Customer) => {
    // Adicionar customer_id se não existir
    const addressWithCustomerId = {
      ...address,
      customer_id: address.customer_id || customer.id
    };
    setSelectedAddress(addressWithCustomerId);
    setSelectedCustomerForAddress(customer);
    setIsEditAddressModalOpen(true);
  };

  const handleCloseEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
    setSelectedAddress(null);
    setSelectedCustomerForAddress(null);
  };

  const handleDeleteAddress = async (addressId: number, customerId: number) => {
    setDeletingAddress(addressId);

    try {
      const response = await fetch(`/api/customers/${customerId}/addresses/${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir endereço");
      }

      toast.success("Endereço excluído com sucesso!");
      onCustomerUpdated();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Erro ao excluir endereço");
    } finally {
      setDeletingAddress(null);
    }
  };

  const handleDeleteCustomer = async (customerId: number) => {
    setDeletingCustomer(customerId);

    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }

      toast.success("Cliente excluído com sucesso!");
      onCustomerUpdated();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Erro ao excluir cliente");
    } finally {
      setDeletingCustomer(null);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-center font-medium text-muted-foreground">
                Cliente
              </TableHead>
              <TableHead className="text-center font-medium text-muted-foreground">
                Localização
              </TableHead>
              <TableHead className="text-center font-medium text-muted-foreground">
                CEP
              </TableHead>
              <TableHead className="text-center font-medium text-muted-foreground">
                Telefone
              </TableHead>
              <TableHead className="text-center font-medium text-muted-foreground">
                Data Cadastro
              </TableHead>
              <TableHead className="text-center font-medium text-muted-foreground">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <Fragment key={customer.id}>
                <TableRow
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          customer.name
                        )} flex items-center justify-center text-primary-foreground font-medium text-sm`}
                      >
                        {getCustomerInitials(customer.name)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{getPrimaryAddress(customer)}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-sm text-muted-foreground">
                    {getPrimaryCep(customer)}
                  </TableCell>

                  <TableCell className="text-center text-sm text-muted-foreground">
                    {formatPhone(customer.cellphone)}
                  </TableCell>

                  <TableCell className="text-center text-sm text-muted-foreground">
                    {formatDate(customer.created_at)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleToggleAddresses(customer.id)}
                        title="Ver endereços"
                      >
                        {expandedCustomer === customer.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditCustomer(customer)}
                        title="Editar cliente"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setDeleteCustomerDialog({ isOpen: true, customerId: customer.id } )}
                        title="Excluir cliente"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedCustomer === customer.id && (
                  <TableRow key={`addresses-${customer.id}`} className="bg-muted/30">
                    <TableCell colSpan={6} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <h4 className="font-semibold text-foreground">
                              Endereços de {customer.name}
                            </h4>
                          </div>
                          <Button
                            onClick={() => handleAddAddress(customer)}
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Endereço
                          </Button>
                        </div>

                        {customer.addresses && customer.addresses.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            {customer.addresses.map((address, index) => (
                              <div
                                key={`address-${address.id}`}
                                className="bg-card p-4 rounded-lg border border-border shadow-sm"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-foreground">
                                    Endereço {index + 1}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleEditAddress(address, customer)}
                                      title="Editar endereço"
                                    >
                                      <Edit className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => setDeleteAddressDialog({ isOpen: true, addressId: address.id, customerId: customer.id })}
                                      disabled={deletingAddress === address.id}
                                      title="Excluir endereço"
                                    >
                                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <div className="flex justify-between">
                                    <span className="font-medium">CEP:</span>
                                    <span>{formatCep(address.postal_code)}</span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-medium">Rua:</span>
                                    <span className="text-right">{address.street}</span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-medium">Número:</span>
                                    <span>{address.number}</span>
                                  </div>

                                  <div className="flex justify-between">
                                    <span className="font-medium">Bairro:</span>
                                    <span>{address.neighborhood}</span>
                                  </div>

                                  {address.complement && (
                                    <div className="flex justify-between">
                                      <span className="font-medium">Complemento:</span>
                                      <span className="text-right">{address.complement}</span>
                                    </div>
                                  )}

                                  {address.created_at && (
                                    <div className="flex justify-between pt-2 border-t border-border">
                                      <span className="font-medium">Cadastrado em:</span>
                                      <span>{formatDate(address.created_at)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                            <p className="text-muted-foreground font-medium">
                              Nenhum endereço cadastrado
                            </p>
                            <p className="text-sm text-muted-foreground/70 mt-1">
                              Este cliente ainda não possui endereços cadastrados
                            </p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      <EditCustomerModal
        isOpen={isEditModalOpen}
        customer={selectedCustomer}
        onClose={handleCloseEditModal}
        onCustomerUpdated={onCustomerUpdated}
      />

      <CreateAddressModal
        isOpen={isAddressModalOpen}
        customerId={selectedCustomerForAddress?.id || null}
        customerName={selectedCustomerForAddress?.name || ""}
        onClose={handleCloseAddressModal}
        onAddressCreated={onCustomerUpdated}
      />

      <EditAddressModal
        isOpen={isEditAddressModalOpen}
        address={selectedAddress}
        customerName={selectedCustomerForAddress?.name || ""}
        onClose={handleCloseEditAddressModal}
        onAddressUpdated={onCustomerUpdated}
      />

      <AlertDialog open={deleteCustomerDialog.isOpen} onOpenChange={(open) => { if (!open) setDeleteCustomerDialog({ isOpen: false, customerId: null }); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteCustomerDialog({ isOpen: false, customerId: null })}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteCustomerDialog.customerId !== null) {
                  handleDeleteCustomer(deleteCustomerDialog.customerId);
                }
                setDeleteCustomerDialog({ isOpen: false, customerId: null });
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteAddressDialog.isOpen} onOpenChange={(open) => { if (!open) setDeleteAddressDialog({ isOpen: false, addressId: null, customerId: null }); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Endereço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAddressDialog({ isOpen: false, addressId: null, customerId: null })}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteAddressDialog.addressId !== null && deleteAddressDialog.customerId !== null) {
                  handleDeleteAddress(deleteAddressDialog.addressId, deleteAddressDialog.customerId);
                }
                setDeleteAddressDialog({ isOpen: false, addressId: null, customerId: null });
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}